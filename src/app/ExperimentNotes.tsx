import { useId, useState } from 'react'
import type { ReactNode } from 'react'
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from '@patternfly/react-core'
import { CodeIcon } from '@patternfly/react-icons'

interface ExperimentNotesProps {
  context: string
  children: ReactNode
}

export function ExperimentNotes({ context, children }: ExperimentNotesProps) {
  const id = useId()
  const [isOpen, setIsOpen] = useState(false)
  const close = () => setIsOpen(false)

  return (
    <>
      <Button variant="link" isInline icon={<CodeIcon />} aria-haspopup="dialog" onClick={() => setIsOpen(true)}>
        Implementation notes
      </Button>
      <Modal
        variant="large"
        isOpen={isOpen}
        onClose={close}
        aria-labelledby={`${id}-title`}
        aria-describedby={`${id}-description`}
        elementToFocus={`[id="${id}-body"]`}
      >
        <ModalHeader title="Implementation notes" labelId={`${id}-title`} description={context} descriptorId={`${id}-description`} />
        <ModalBody id={`${id}-body`} tabIndex={0} aria-label="Implementation notes content">
          {isOpen && children}
        </ModalBody>
        <ModalFooter>
          <Button variant="secondary" onClick={close}>Close</Button>
        </ModalFooter>
      </Modal>
    </>
  )
}
