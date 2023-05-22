import CardCreateUniqueTokenUseCase from "../../../../../src/Card/Application/CardCreateUniqueTokenUseCase";
import CardStoreUseCase from "../../../../../src/Card/Application/CardStoreUseCase";
import CardEntity from "../../../../../src/Card/Domain/CardEntity";
import CardExpirationToken from "../../../../../src/Card/Domain/ValueObjects/CardExpirationToken";
import CardToken from "../../../../../src/Card/Domain/ValueObjects/CardToken";
import CardTokenizerController from "../../../../../src/Card/Infrastructure/Controllers/CardTokenizerController";
import CardValidator from "../../../../../src/Card/Infrastructure/Validators/CardValidator";
import { DateHelper } from "../../../../../src/Share/Domain/Helpers/DateHelper";
import { CreditCatdTestUtil } from "../../../../Utils/CreditCardTestUtil";

describe('CardTokenizerController_class', () => { 

    it("test_card_tokenizer_controller_constructor", () => {
        const controller = new CardTokenizerController();
        expect(controller['cardCreateUniqueToken']).toBeInstanceOf(CardCreateUniqueTokenUseCase);
        expect(controller['cardStore']).toBeInstanceOf(CardStoreUseCase);
        expect(controller['validator']).toBeInstanceOf(CardValidator);
    });

    it("test_validator_validates_parameters_successfully", async () => {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const mockRequest: any = { body: {
            card_number: CreditCatdTestUtil.getTestCard(),
            cvv: 123,
            expiration_month: "12",
            expiration_year: String(currentYear),
            email: "test@gmail.com"
        }};
        const mockResponse: any = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        const mockCardEntity: CardEntity = CardEntity.builder()
            .withToken(new CardToken("valid_token"))
            .withExpirationToken(new CardExpirationToken(DateHelper.addminutes(new Date, 15)))
            .build();
        const mockCardStoreUseCase: any = {
            execute: jest.fn().mockResolvedValue(mockCardEntity)
        };
        const controller = new CardTokenizerController();
        controller["cardStore"] = mockCardStoreUseCase;

        await controller.__invoke(mockRequest, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalled();
    });
});
