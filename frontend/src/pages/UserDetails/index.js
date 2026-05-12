import { useState, useEffect } from 'react'

import Header from '../../components/Navbar'

import { ThreeDots } from 'react-loader-spinner'

import {
  UserDetailsPage,
  ProfileCard,
  Key,
  Value,
  LoaderContainer,
  ProfileHeader,
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
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const token = localStorage.getItem('authToken')
        console.log(token)

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
        console.log(formattedData)
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
                <ProfileName>{fullName}</ProfileName>
                <ProfileEmail>{email}</ProfileEmail>
              </ProfileInfo>
            </ProfileHeader>

            <SectionHeading>Personal Information</SectionHeading>

            <DetailsGrid>
              <DetailBox>
                <Key>Phone</Key>
                <Value>{phone}</Value>
              </DetailBox>

              <DetailBox>
                <Key>Email</Key>
                <Value>{email}</Value>
              </DetailBox>
            </DetailsGrid>

            <SectionHeading>Shipping Address</SectionHeading>

            <DetailsGrid>
              <DetailBox>
                <Key>Address</Key>
                <Value>{address?.addressLine}</Value>
              </DetailBox>

              <DetailBox>
                <Key>City</Key>
                <Value>{address?.city}</Value>
              </DetailBox>

              <DetailBox>
                <Key>State</Key>
                <Value>{address?.state}</Value>
              </DetailBox>

              <DetailBox>
                <Key>Pincode</Key>
                <Value>{address?.pincode}</Value>
              </DetailBox>
            </DetailsGrid>
          </ProfileCard>
        </UserDetailsPage>
      )}
    </>
  )
}

export default UserDetails
