import CardFindByTokenUseCase from "../../../../../src/Card/Application/CardFindByTokenUseCase";
import CardEntity from "../../../../../src/Card/Domain/CardEntity";
import CardCvv from "../../../../../src/Card/Domain/ValueObjects/CardCvv";
import CardEmail from "../../../../../src/Card/Domain/ValueObjects/CardEmail";
import CardExpirationMonth from "../../../../../src/Card/Domain/ValueObjects/CardExpirationMonth";
import CardExpirationToken from "../../../../../src/Card/Domain/ValueObjects/CardExpirationToken";
import CardExpirationYear from "../../../../../src/Card/Domain/ValueObjects/CardExpirationYear";
import CardNumber from "../../../../../src/Card/Domain/ValueObjects/CardNumber";
import CardToken from "../../../../../src/Card/Domain/ValueObjects/CardToken";
import CardFindByTokenController from "../../../../../src/Card/Infrastructure/Controllers/CardFindByTokenController";
import { DateHelper } from "../../../../../src/Share/Domain/Helpers/DateHelper";

describe('CardFindByTokenController_class', () => { 

    it("test_card_find_by_token_controller_constructor", () => {
        const controller = new CardFindByTokenController();
        expect(controller['cardFindByToken']).toBeInstanceOf(CardFindByTokenUseCase);
    });

    it("test_card_find_by_token_controller_returns_404_if_card_entity_token_expired", async () => {
        const mockCardEntity: CardEntity = CardEntity.builder()
            .withToken(new CardToken("valid_token"))
            .withExpirationToken(new CardExpirationToken(new Date("2021-01-01")))
            .build();
        const mockCardFindByTokenUseCase: any = {
            execute: jest.fn().mockResolvedValue(mockCardEntity)
        };
        const mockRequest: any = {
            params: {
                token: "valid_token"
            }
        };
        const mockResponse: any = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        const controller = new CardFindByTokenController();
        controller['cardFindByToken'] = mockCardFindByTokenUseCase;

        await controller.__invoke(mockRequest, mockResponse);

        expect(mockCardFindByTokenUseCase.execute).toHaveBeenCalledWith("valid_token");
        expect(mockResponse.status).toHaveBeenCalledWith(404);
        expect(mockResponse.json).toHaveBeenCalledWith({ message: 'El token ha expirado.' });
    });

    it("test_card_find_by_token_controller_returns_404_if_card_entity_not_found", async () => {
        const mockCardFindByTokenUseCase: any = {
            execute: jest.fn().mockResolvedValue(null)
        };
        const mockRequest: any = {
            params: {
                token: "invalid_token"
            }
        };
        const mockResponse: any = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        const controller = new CardFindByTokenController();
        controller["cardFindByToken"] = mockCardFindByTokenUseCase;


        await controller.__invoke(mockRequest, mockResponse);

        expect(mockCardFindByTokenUseCase.execute).toHaveBeenCalledWith("invalid_token");
        expect(mockResponse.status).toHaveBeenCalledWith(404);
        expect(mockResponse.json).toHaveBeenCalledWith({ message: 'No existe tarjeta asociada al token.' });
    });

    it("test_card_find_by_token_controller_returns_card_resource_if_card_entity_found_and_not_expired", async () => {
        const mockCardEntity: CardEntity = CardEntity.builder()
            .withNumber(new CardNumber(4111111111111111))
            .withCvv(new CardCvv(123))
            .withExpirationMonth(new CardExpirationMonth("12"))
            .withExpirationYear(new CardExpirationYear("2022"))
            .withEmail(new CardEmail("test@test.com"))
            .withToken(new CardToken("valid_token"))
            .withExpirationToken(new CardExpirationToken(DateHelper.addminutes(new Date, 15)))
            .build();
        const mockCardFindByTokenUseCase: any = {
            execute: jest.fn().mockResolvedValue(mockCardEntity)
        };
        const mockRequest: any = {
            params: {
                token: "valid_token"
            }
        };
        const mockResponse:  any = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        const controller = new CardFindByTokenController();
        controller["cardFindByToken"] = mockCardFindByTokenUseCase;

        await controller.__invoke(mockRequest, mockResponse);

        expect(mockCardFindByTokenUseCase.execute).toHaveBeenCalledWith("valid_token");
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith({
            message: 'Se encontró la tarjeta.',
            card: {
                number: 4111111111111111,
                number_hidden: "************1111",
                cvv: 123,
                expiration_month: "12",
                expiration_year: "2022",
                token: "valid_token",
                expiration_token: mockCardEntity.expirationToken.getValue(),
                email: "test@test.com"
            }
        });
    });
});
