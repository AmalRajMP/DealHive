import { useState, useEffect } from 'react'

import Header from '../../components/Navbar'

import { ThreeDots } from 'react-loader-spinner'
import { FiEdit2 } from 'react-icons/fi'

import {
  UserDetailsPage,
  ProfileCard,
  Key,
  Value,
  LoaderContainer,
  ProfileHeader,
  EditButton,
  ActionButtonsContainer,
  CancelButton,
  SaveButton,
  InputBox,
  ProfileAvatar,
  ProfileInfo,
  ProfileName,
  ProfileEmail,
  SectionHeading,
  DetailsGrid,
  DetailBox,
} from './styledComponents'

const UserDetails = () => {
  const [userDetails, setUserDetails] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: {},
  })
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    addressLine: '',
    city: '',
    state: '',
    pincode: '',
  })

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value })
  }

  const onClickSave = async () => {
    try {
      const token = localStorage.getItem('authToken')

      const url = 'http://localhost:5000/api/users/me'
      const options = {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      }

      const response = await fetch(url, options)
      if (!response.ok) {
        throw Error('Failed to update user details')
      }

      const data = await response.json()
      const formattedData = {
        fullName: `${data.updatedUserDetails.firstName} ${data.updatedUserDetails.lastName}`,
        email: data.updatedUserDetails.emailID,
        phone: data.updatedUserDetails.contactNo,
        address: {
          addressLine: data.updatedUserDetails.address?.addressLine,
          city: data.updatedUserDetails.address?.city,
          state: data.updatedUserDetails.address?.state,
          pincode: data.updatedUserDetails.address?.pincode,
        },
      }
      setUserDetails(formattedData)
      setIsEditing(false)
      console.log('User details updated successfully')
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const token = localStorage.getItem('authToken')

        const url = 'http://localhost:5000/api/users/me'
        const options = {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }

        const response = await fetch(url, options)
        if (!response.ok) {
          throw Error('Failed to fetch user details')
        }
        const data = await response.json()
        const formattedData = {
          fullName: `${data.firstName} ${data.lastName}`,
          email: data.emailID,
          phone: data.contactNo,
          address: {
            addressLine: data.address?.addressLine,
            city: data.address?.city,
            state: data.address?.state,
            pincode: data.address?.pincode,
          },
        }
        setUserDetails(formattedData)
        setIsLoading(false)
      } catch (e) {
        console.log(e)
        setIsLoading(false)
      }
    }
    getUserDetails()
  }, [])

  const renderLoadingView = () => (
    <LoaderContainer>
      <ThreeDots height="50" width="50" color="#2563eb" />
    </LoaderContainer>
  )

  const { fullName, email, phone, address } = userDetails

  return (
    <>
      <Header />
      {isLoading ? (
        renderLoadingView()
      ) : (
        <UserDetailsPage>
          <ProfileCard>
            <ProfileHeader>
              <ProfileAvatar>{fullName?.charAt(0).toUpperCase()}</ProfileAvatar>

              <ProfileInfo>
                {isEditing ? (
                  <InputBox
                    isHeaderInput
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                  />
                ) : (
                  <ProfileName>{fullName}</ProfileName>
                )}
                {isEditing ? (
                  <InputBox
                    isHeaderInput
                    type="text"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                ) : (
                  <ProfileEmail>{email}</ProfileEmail>
                )}
              </ProfileInfo>

              {!isEditing ? (
                <EditButton
                  type="button"
                  onClick={() => {
                    setIsEditing(true)
                    setFormData({
                      fullName,
                      email,
                      phone,
                      addressLine: address?.addressLine,
                      city: address?.city,
                      state: address?.state,
                      pincode: address?.pincode,
                    })
                  }}
                >
                  <FiEdit2 />
                  Edit Profile
                </EditButton>
              ) : (
                <ActionButtonsContainer>
                  <CancelButton
                    type="button"
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </CancelButton>

                  <SaveButton type="button" onClick={onClickSave}>
                    Save Changes
                  </SaveButton>
                </ActionButtonsContainer>
              )}
            </ProfileHeader>

            <SectionHeading>Personal Information</SectionHeading>

            <DetailsGrid>
              <DetailBox>
                <Key>Phone</Key>
                {isEditing ? (
                  <InputBox
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                ) : (
                  <Value>{phone}</Value>
                )}
              </DetailBox>

              <DetailBox>
                <Key>Email</Key>
                {isEditing ? (
                  <InputBox
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                ) : (
                  <Value>{email}</Value>
                )}
              </DetailBox>
            </DetailsGrid>

            <SectionHeading>Shipping Address</SectionHeading>

            <DetailsGrid>
              <DetailBox>
                <Key>Address</Key>
                {isEditing ? (
                  <InputBox
                    type="text"
                    name="addressLine"
                    value={formData.addressLine}
                    onChange={handleChange}
                  />
                ) : (
                  <Value>{address?.addressLine}</Value>
                )}
              </DetailBox>

              <DetailBox>
                <Key>City</Key>
                {isEditing ? (
                  <InputBox
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                  />
                ) : (
                  <Value>{address?.city}</Value>
                )}
              </DetailBox>

              <DetailBox>
                <Key>State</Key>
                {isEditing ? (
                  <InputBox
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                  />
                ) : (
                  <Value>{address?.state}</Value>
                )}
              </DetailBox>

              <DetailBox>
                <Key>Pincode</Key>
                {isEditing ? (
                  <InputBox
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                  />
                ) : (
                  <Value>{address?.pincode}</Value>
                )}
              </DetailBox>
            </DetailsGrid>
          </ProfileCard>
        </UserDetailsPage>
      )}
    </>
  )
}

export default UserDetails
