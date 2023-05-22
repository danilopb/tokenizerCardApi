import { Request, Response } from "express";
import CardValidator from "../Validators/CardValidator";
import CardCreateUniqueTokenUseCase from "../../Application/CardCreateUniqueTokenUseCase";
import CardStoreUseCase from "../../Application/CardStoreUseCase";
import CardEntity from "../../Domain/CardEntity";
export default class CardTokenizerController
{
    private cardCreateUniqueToken: CardCreateUniqueTokenUseCase;
    private cardStore: CardStoreUseCase;
    private validator: CardValidator;

    constructor()
    {   
        this.cardCreateUniqueToken = new CardCreateUniqueTokenUseCase();
        this.cardStore = new CardStoreUseCase();
        this.validator = new CardValidator();

    }

    __invoke(req: Request, res: Response)
    {
        let parameters =  req.body;
        this.validator.validate(parameters);
        const token = this.cardCreateUniqueToken.execute();
        parameters.token = token;
        this.cardStore.execute(parameters)
            .then((cardEntity: CardEntity) => {
                let cardResource = { 
                    token: cardEntity.token.getValue(),
                    expiration_token: cardEntity.expirationToken.getValue(),
                };
                return res.status(200).json({ message: 'Tarjeta creada correctamente', card: cardResource });
            }).catch((error: Error) => {
                console.log("ERROR:", error);
                return res.status(500).json({ message: error });
            });
    }
}
