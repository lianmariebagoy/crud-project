"use client"

import React, { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { UseDataContext } from '../../context/data'

const EditPage = () => {
  const { data, fillData } = UseDataContext()
  const [details, setDetails] = useState({ name: "", username: "" })
  const params = useParams()
  const router = useRouter()
  const { id } = params

  useEffect(() => {
    const target = data.find((item) => Number(item.id) === Number(id))
    if (target) {
      setDetails({ name: target.name, username: target.username })
    }
  }, [data, id])

  const handleChange = (e) => {
    const { name, value } = e.target
    setDetails((prevDetails) => ({ ...prevDetails, [name]: value }))
  }

  const handleSubmit = () => {
    const updatedData = data.map((item) =>
      item.id === Number(id) ? { ...item, ...details } : item
    )
    fillData(updatedData)
    router.push('/')
  }

  return (
    <div className="form-container">
      <div className="form">
        <input name='name' onChange={handleChange} type='text' placeholder='Name' value={details.name} />
        <input name='username' onChange={handleChange} type='text' placeholder='Username' value={details.username} />
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  )
}

export default EditPage
