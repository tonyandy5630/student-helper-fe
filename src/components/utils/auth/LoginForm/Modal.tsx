import React from "react"
import { Modal, Stack, Container, Box, Typography, Button, Backdrop } from "@mui/material"
import ReactDom from "react-dom"

type ModalProps = {
  visible: boolean
  setVisible?: any
  children?: React.ReactNode
  email?: string
}
export default function MyCustomModal({ visible, setVisible, children, email }: ModalProps) {
  return ReactDom.createPortal(
    <Backdrop open={visible} onClick={setVisible}>
      <Container
        component={Stack}
        maxWidth='sm'
        className='bg-white'
        sx={{
          bgcolor: "white",
          border: "none",
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
          borderRadius: "10px"
        }}
      >
        <Typography
          variant='h6'
          fontWeight='bold'
          sx={{
            color: "#a8fd85"
          }}
        >
          Register successfully
        </Typography>
        <Typography variant='caption' gutterBottom>
          A verify email has been sent to <span>{email}</span>
        </Typography>
      </Container>
    </Backdrop>,
    document.getElementById("portal") as HTMLElement
  )
}
