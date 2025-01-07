import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { signUpValidation as updateValidation } from '../../../utils/validations'
import { updateUser, logout } from '../../../utils/authServices'

import H1 from '../../common/H1/H1'
import Form from '../../common/Form/Form'
import FormInput from '../../common/FormInput/FormInput'
import Button from '../../common/Button/Button'
import Text from '../../common/Text/Text'

// TODO: Style - Make this a modal
export default function AccountSettings({ user, setUser, setIsEditingAccount }) {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [form, setForm] = useState({
        email: '',
        password: '',
        confirmPassword: ''
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

        const errors = updateValidation(form)
        if (Object.keys(errors).length) {
            setError(errors)
            setLoading(false)
            return
        }

        try {
            const data = await updateUser(form)
            setUser(data.user)
            setForm({
                email: '',
                password: '',
                confirmPassword: ''
            })
            setIsEditingAccount(false)
        } catch (error) {
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            <H1>Account Settings</H1>
            {error && <div>{Object.values(error)}</div>}
            <Text>Update your email and password</Text>
            <Text>Email: {user.email}</Text>
            <Form onSubmit={handleSumbit}>
            <FormInput label='Update Email' type='email' name='email' onChange={handleChange} value={form.email} />
                <FormInput label='Update Password' type='password' name='password' onChange={handleChange} value={form.password} />
                <FormInput label='Confirm Update Password' type='password' name='confirmPassword' onChange={handleChange} value={form.confirmPassword} />
                <Button type='submit' disabled={loading}>{loading ? 'Submitting...' : 'Save'}</Button>
            </Form>
            <Button onClick={() => logout(setUser, navigate)}>Logout</Button>
            <Button onClick={() => setIsEditingAccount(false)}>Cancel</Button>
        </div>
    )
}