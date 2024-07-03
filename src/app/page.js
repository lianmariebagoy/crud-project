"use client"

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { UseDataContext } from './context/data'

const Page = () => {
  const router = useRouter()
  const { fillData, data, loaded } = UseDataContext()
  const [showAddForm, setShowAddForm] = useState(false)
  const [newContact, setNewContact] = useState({ name: '', username: '', phone: '' })

  const fetchUser = async () => {
    const response = await axios('https://jsonplaceholder.typicode.com/users')
    const { data: responseData } = response
    fillData(responseData)
  }

  useEffect(() => {
    if (!loaded && data.length === 0) {
      fetchUser()
    }
  }, [loaded, data])

  const handleDelete = (id) => {
    const newArray = data.filter((item) => item.id !== id)
    fillData(newArray)
  }

  const handleEdit = (id) => {
    router.push(`/edit/${id}`)
  }

  const handleShowAddForm = () => {
    setShowAddForm(true)
  }

  const handleHideAddForm = () => {
    setShowAddForm(false)
  }

  const handleAddInputChange = (e) => {
    const { name, value } = e.target
    setNewContact((prevDetails) => ({ ...prevDetails, [name]: value }))
  }

  const handleAddSubmit = () => {
    const newId = data.length ? Math.max(...data.map(item => item.id)) + 1 : 1
    const newContactWithId = { ...newContact, id: newId }
    fillData([newContactWithId, ...data])
    setShowAddForm(false)
    setNewContact({ name: '', username: '', phone: '' })
  }

  return (
    <div className="container">
      <button className="add-button" onClick={handleShowAddForm}>Add Contact</button>
      {showAddForm && (
        <div className="form-container">
          <div className="form">
            <input name='name' onChange={handleAddInputChange} type='text' placeholder='Name' value={newContact.name} />
            <input name='username' onChange={handleAddInputChange} type='text' placeholder='Username' value={newContact.username} />
            <input name='phone' onChange={handleAddInputChange} type='text' placeholder='Phone' value={newContact.phone} />
            <button onClick={handleAddSubmit}>Submit</button>
            <button onClick={handleHideAddForm}>Cancel</button>
          </div>
        </div>
      )}
      {data?.length !== 0 && data?.map((item) => {
        const { name, phone, id } = item
        return (
          <div key={id} className="contact-card">
            <div>
              <p>{name}</p>
              <pre>{phone}</pre>
            </div>
            <div className="button-group">
              <button className="edit-button" onClick={() => handleEdit(id)}>Edit</button>
              <button className="delete-button" onClick={() => handleDelete(id)}>Delete</button>
            </div>
          </div>
        )
      })}
      {!data?.length && <p>No data available!</p>}
    </div>
  )
}

export default Page