import { MailAdapter } from '../adapters/mail-adapter';
import { FeedbacksRepository } from '../repositories/feedbacks-repository'

interface SubmitFeedbackUseCaseRequest {
    type: string;
    comment: string;
    screenshot?: string;
}

export class SubmitFeedbackUseCase {
    constructor(
        private feedbackRepository: FeedbacksRepository,
        private mailAdapter: MailAdapter
    ) {}

    async execute(request: SubmitFeedbackUseCaseRequest) {
        const { type, comment, screenshot } = request

        if(!type) {
            throw new Error('Type should not be empty.')
        }

        if(!comment) {
            throw new Error('Comment should not be empty.')
        }

        await this.feedbackRepository.create({
            type, 
            comment,
            screenshot
        })

        if(screenshot && !screenshot.startsWith('data:image/png;base64')) {
            throw new Error('Invalid screenshot format.')
        }

        await this.mailAdapter.sendMail({
            subject: `Alerta de ${type}`,
            body: [
                `<div style="font-family:sans-serif; font-size:16px; color:#111;">`,
                `<p>Tipo do feedback: ${type}</p>`,
                `<p>Comentário: ${comment}</p>`,
                `${screenshot ? `<img src="${screenshot}">` : `<p>Sem foto</p>`}`,
                `</div>`
            ].join('\n')
        })
    }
}