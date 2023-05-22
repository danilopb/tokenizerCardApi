// import LoginUseCase from "../../../src/Auth/Application/LoginUseCase";
// import AuthenticationException from "../../../src/Auth/Domain/Exceptions/AuthenticationException";
// import AuthLoginController from "../../../src/Auth/Infrastructure/Controllers/AuthLoginController";
// import AuthLoginValidator from "../../../src/Auth/Infrastructure/Validators/AuthLoginValidator";

import LoginUseCase from "../../../../../src/Auth/Application/LoginUseCase";
import AuthenticationException from "../../../../../src/Auth/Domain/Exceptions/AuthenticationException";
import AuthLoginController from "../../../../../src/Auth/Infrastructure/Controllers/AuthLoginController";
import AuthLoginValidator from "../../../../../src/Auth/Infrastructure/Validators/AuthLoginValidator";
import ValidatorException from "../../../../../src/Share/Domain/Exceptions/ValidatorException";

// import AuthenticationException from "../../../src/Auth/Domain/Exceptions/AuthenticationException";
// import AuthLoginController from "../../../src/Auth/Infrastructure/Controllers/AuthLoginController";
// import ValidatorException from "../../../src/Share/Domain/Exceptions/ValidatorException";
// import AuthenticationException from "../../../src/Auth/Domain/Exceptions/AuthenticationException";
// import ValidatorException from "../../../src/Share/Domain/Exceptions/ValidatorException";

describe('AuthLoginController_class', () => {

    it("test_auth_login_controller_constructor", () => {
        const controller = new AuthLoginController();
        expect(controller['login']).toBeInstanceOf(LoginUseCase);
        expect(controller['validator']).toBeInstanceOf(AuthLoginValidator);
    });

    it("test_auth_login_controller_invoke_success", () => {
        const req: any = { body: { username: "validUser", password: "validPassword" } };
        const res: any = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        const loginUseCaseMock = { execute: jest.fn().mockReturnValue("validApiToken") };
        const authLoginController = new AuthLoginController();
        authLoginController['login'] = loginUseCaseMock;

        authLoginController.__invoke(req, res);

        expect(loginUseCaseMock.execute).toHaveBeenCalledWith("validUser", "validPassword");
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ message: 'Autenticación exitosa', api_token: "validApiToken" });
    });

    it("test_auth_login_controller_invoke_invalid_credentials", () => {
        const controller = new AuthLoginController();
        const mockRequest: any = { body: { username: "invaliduser", password: "invalidpassword" } };
        const mockResponse: any = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        expect(() => controller.__invoke(mockRequest, mockResponse)).toThrow(AuthenticationException);
    });

    it("test_auth_login_controller_invoke_missing_parameters", () => {
        const controller = new AuthLoginController();
        const mockRequest: any = { body: { } };
        const mockResponse: any = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        expect(() => controller.__invoke(mockRequest, mockResponse)).toThrow(ValidatorException);
    });
});
