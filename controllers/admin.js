const verify = async (req, res) => {
    try {
        const { passcode, email } = req.body;

        // Check if the provided passcode matches the environment variable
        if (passcode !== process.env.EVENT_CREATION_PASSCODE) {
            return res.status(401).json({
                success: false,
                message: 'Invalid passcode',
            });
        }

        // Define the list of allowed emails
        const allowedEmails = ['patilmayur.2745@gmail.com'];

        // Check if the provided email is in the list of allowed emails
        if (!allowedEmails.includes(email)) {
            return res.status(401).json({
                success: false,
                message: 'Unauthorized user',
            });
        }

        // If all checks pass, return a success response
        return res.status(200).json({
            success: true,
            message: 'Logged in successfully',
        });
    } catch (error) {
        // Handle any errors that occurred during verification
        console.error('Error occurred:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to login',
            error: error.message,
        });
    }
}

module.exports = verify;