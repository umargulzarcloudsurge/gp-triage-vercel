import LoginComponent from '@/app/components/LoginComponent'
import React from 'react'

const Login = async () => {
	await new Promise(res => setTimeout(res, 5000))
	return (
		<div>
			<LoginComponent />
		</div>
	)
}

export default Login