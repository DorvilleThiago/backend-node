class CaptchaRepository {

    async verifyCaptcha(token: string) {
        try {
            const secret = process.env.SECRET_KEY
            const url = `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${token}`;
            const response = await fetch(url);
            const result = await response.json();
            const { success } = result;
            return success;
        } catch (err) {
            console.error('Error verifying ReCAPTCHA token:', err);
            return false;
        }
    }
}

export default new CaptchaRepository()