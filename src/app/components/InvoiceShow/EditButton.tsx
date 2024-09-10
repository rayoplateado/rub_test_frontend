import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import { paths } from '../../paths/index'

const EditButton = ({
  finalized,
  id,
}: {
  finalized?: boolean
  id?: string
}) => {
  if (finalized) {
    return (
      <OverlayTrigger
        placement="bottom"
        overlay={
          <Tooltip id="tooltip-disabled">
            Finalized invoice cannot be edited
          </Tooltip>
        }
      >
        <span>
          <Button variant="outline-primary" disabled>
            Edit
          </Button>
        </span>
      </OverlayTrigger>
    )
  }

  if (!id) {
    return null
  }

  return (
    <Link to={paths.invoices.edit(id)}>
      <Button variant="outline-primary">Edit</Button>
    </Link>
  )
}

export default EditButton
