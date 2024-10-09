import { Spin } from 'antd'
import React from 'react'

const loading = () => {
	return (
		<>
			<main className='w-full  h-screen flex justify-center items-center'>
				<Spin spinning={true} />
			</main>
		</>
	)
}

export default loading