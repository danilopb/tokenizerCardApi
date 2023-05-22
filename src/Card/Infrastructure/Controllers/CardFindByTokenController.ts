import { Request, Response } from "express";
import CardEntity from "../../Domain/CardEntity";
import CardFindByTokenUseCase from "../../Application/CardFindByTokenUseCase";
export default class CardFindByTokenController
{
    private cardFindByToken: CardFindByTokenUseCase;

    constructor()
    {   
        this.cardFindByToken = new CardFindByTokenUseCase();
    }

    __invoke(req: Request, res: Response)
    {
        const token = req.params.token;
        this.cardFindByToken.execute(token)
            .then((cardEntity: CardEntity | null) => {

                if (!cardEntity)
                {
                    return res.status(404).json({ message: 'No existe tarjeta asociada al token.'});
                }

                if (cardEntity.isTokenExpired())
                {
                    return res.status(404).json({ message: 'El token ha expirado.'});
                }

                let cardResource = { 
                    number: cardEntity.number.getValue(),
                    number_hidden: cardEntity.number.getHiddenCard(),
                    cvv: cardEntity.cvv.getValue(),
                    expiration_month: cardEntity.expirationMonth.getValue(),
                    expiration_year: cardEntity.expirationYear.getValue(),
                    token: cardEntity.token.getValue(),
                    expiration_token: cardEntity.expirationToken.getValue(),
                    email: cardEntity.email.getValue(),
                };

                return res.status(200).json({ message: 'Se encontró la tarjeta.', card : cardResource });
            }).catch((error: Error) => {
                console.log("ERROR:", error);
                return res.status(500).json({ message: error });
            });
    }
}
