import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { profileEdit } from '../../../utils/profileServices'

import Form from '../../common/Form/Form'
import FormInput from '../../common/FormInput/FormInput'
import H1 from '../../common/H1/H1'
import Button from '../../common/Button/Button'
import AvatarSelect from '../AvatarSelect/AvatarSelect'
import FormSelect from '../../common/FormSelect/FormSelect'
import FormOption from '../../common/FormOption/FormOption'

const pokemonGreetings = [
    'Gotta catch \'em all, Trainer!',
    'Welcome to the world of Pokémon battles!',
    'It\'s super effective to see you here!',
    'Are you ready to duel like it\'s 1999?',
    'Let the power of your Pokémon guide your cards!',
    'Catch \'em all—and win the match!',
    'Shuffle your deck and let\'s Pokémon GO!',
    'Trainer, your destiny awaits at the table!',
    'Will you be the very best, like no one ever was?',
    'Channel your inner Pikachu and spark some fun!'
]

export default function ProfileEdit({ profile, setIsEditingProfile, setUser }) {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [form, setForm] = useState({
        username: ''
    })

    useEffect(() => {
        if (profile && profile.username) {
            setForm({ username: profile.username, greeting: profile.greeting })
        }
    }, [profile])

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

        try {
            const data = await profileEdit(form, profile._id)
            setUser((prevUser) => ({
                ...prevUser,
                profile: data
            }))
            setForm({
                username: ''
            })
            navigate('/profile')
        } catch (error) {
            console.log(error)
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            <H1>Edit Profile</H1>
            {error && <div>{Object.values(error)}</div>}
            <AvatarSelect setUser={setUser} profile={profile} setError={setError} />
            <Form onSubmit={handleSumbit}>
                <FormInput label='Username' type='text' name='username' onChange={handleChange} value={form.username}/>
                <FormSelect label='Greeting' name='greeting' value={form.greeting} onChange={handleChange}>
                    {pokemonGreetings.map((greeting, index) => (
                        <FormOption key={index} value={greeting}>{greeting}</FormOption>
                    ))}
                </FormSelect>
                <Button type='submit' disabled={loading}>{loading ? 'Submitting...' : 'Save'}</Button>
            </Form>
            <Button onClick={() => setIsEditingProfile(false)}>Back to Profile</Button>
        </div>
    )
}