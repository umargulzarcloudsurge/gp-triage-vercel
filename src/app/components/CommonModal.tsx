import { Modal } from 'antd';

function CommonModal({ isModalOpen, handleCancel, title, children }: any) {
	return (
		<>
			<Modal
				width={957}
				title={title}
				open={isModalOpen}
				onCancel={handleCancel}
				footer={null}
				closable={false}
				className="projectModal bg-modal h-[80vh]">
				{children}
			</Modal>
		</>
	);
}

export default CommonModal;
