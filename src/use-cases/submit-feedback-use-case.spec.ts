import { SubmitFeedbackUseCase } from "./submit-feedback-use-case"

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackUseCase(
    { create: createFeedbackSpy },
    { sendMail: sendMailSpy }
)

describe('Send feedback', () => {

    it('should be able to send feedback', async () => {

        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: 'comment',
            screenshot: 'data:image/png;base64'
        })).resolves.not.toThrow();

        expect(createFeedbackSpy).toHaveBeenCalled();
        expect(sendMailSpy).toHaveBeenCalled();
    })

    it('shouldnt be able to send feedback without type', async () => {

        await expect(submitFeedback.execute({
            type: '',
            comment: 'comment',
            screenshot: 'data:image/png;base64'
        })).rejects.toThrow();
    })

    it('shouldnt be able to send feedback without comment', async () => {

        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: '',
            screenshot: 'data:image/png;base64'
        })).rejects.toThrow();
    })

    it('shouldnt be able to send feedback with invalid screenshot format', async () => {

        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: 'comment',
            screenshot: 'invalid_screenshot'
        })).rejects.toThrow();
    })
})