import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import { signin } from '../../../utils/authServices'
import { signInValidation } from '../../../utils/validations'
import { UserContext } from '../../../contexts/UserProvider'

import Form from '../../common/Form/Form'
import FormInput from '../../common/FormInput/FormInput'
import H1 from '../../common/H1/H1'
import Button from '../../common/Button/Button'

export default function SignIn() {
    const navigate = useNavigate()
    const { setUser } = useContext(UserContext)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [form, setForm] = useState({
        email: '',
        password: ''
    })

    function handleChange(event) {
        const { name, value } = event.target
        setForm((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    async function handleSumbit(event) {
        event.preventDefault()
        setLoading(true)
        setError(null)

        const errors = signInValidation(form)
        if (Object.keys(errors).length) {
            setError(errors)
            setLoading(false)
            return
        }

        try {
            const data = await signin(form)
            setUser(data.user)
            setForm({
                email: '',
                password: ''
            })
            navigate('/')
        } catch (error) {
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            <H1>Sign In</H1>
            <Form onSubmit={handleSumbit}>
                {error && <div>{Object.values(error)}</div>}
                <FormInput label='Email' type='email' name='email' onChange={handleChange} value={form.email} />
                <FormInput label='Password' type='password' name='password' onChange={handleChange} value={form.password} />
                <Button type='submit' disabled={loading}>{loading ? 'Submitting...' : 'Sign In'}</Button>
            </Form>
        </div>
    )
}