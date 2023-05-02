import { ConfigDialog } from "./config-dialog"

const Dialogs = ({ dialogVisibility, setDialogVisibility }) => {
  return (
    <>
      <ConfigDialog
        close={() =>
          setDialogVisibility((prev) => ({ ...prev, config: false }))
        }
        columns={[]}
        isOpen={dialogVisibility.config}
        // setColumnVisibility={setColumnVisibility}
      />
    </>
  )
}

export { Dialogs }
