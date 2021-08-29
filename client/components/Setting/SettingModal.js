import React from 'react';
import { Modal, Input, Button } from 'native-base';

export function SettingModal(props) {
    const { modalOpen, setModalOpen, handleConfirm, type } = props;

    const typeTitle = (() => {
        if (type === 'username') return 'Edit Name'
    })()

    return (
        <Modal isOpen={modalOpen}>
            <Modal.Content>
                {/* <Modal.CloseButton /> */}
                <Modal.Header>
                    {typeTitle}
                </Modal.Header>
                <Modal.Body>
                    {type === 'username' ?
                        <>
                            <Input
                                placeholder="Last Name"
                                mt={4}
                            />
                            <Input
                                placeholder="First Name"
                                mt={3}
                            />
                        </>
                        :
                        <Input />
                    }
                </Modal.Body>
                <Modal.Footer pr={6} pb={6}>
                    <Button.Group space={2}>
                        <Button
                            onPress={() => setModalOpen(false)}
                            colorScheme="blueGray"
                            variant="outline"
                        >
                            Cancel
                        </Button>
                        <Button
                            onPress={handleConfirm}
                            bg="blueGray.600"
                            colorScheme="blueGray"
                        >
                            Confirm
                        </Button>
                    </Button.Group>
                </Modal.Footer>
            </Modal.Content>
        </Modal>
    )
}