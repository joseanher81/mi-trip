import { Alert, Collapse, IconButton } from "@mui/material";
import { Box } from "@mui/system";
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';

interface Props {
    message?: string | null
}

export const ErrorAlert = ({message}: Props) => {

    const [alertOpen, setAlertOpen] = useState(true);

    return (
        <Box sx={{ width: '100%' }}>
            <Collapse in={alertOpen}>
                <Alert
                    severity="error"
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                                setAlertOpen(false);
                            }}
                        >
                            <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }
                    sx={{ mb: 2 }}
                >
                    { message }
                </Alert>
            </Collapse>
        </Box>
    )
}
