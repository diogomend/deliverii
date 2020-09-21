import api from "@/plugins/api";
import authService from "@/service/auth";
import orderService from "@/service/order";
import decode from "jwt-decode";
jest.mock("@/plugins/api");
jest.mock("jwt-decode");
describe("Auth Service", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        jest.resetAllMocks();
      });
      afterEach(() => {    
        jest.clearAllMocks();
      });
    it("expects to call persistUser", async () => {
        jest.spyOn(api, "post").mockImplementation(() => {
            return {
                data: 'MOCK_RESPONSE'
            }
        });
        const persist = jest.spyOn(authService, 'persistUser');
        const ret = await authService.login("MOCK_EMAIL", "MOCK_PASSWORD")
        expect(persist).toHaveBeenCalled();
        expect(ret).toEqual('MOCK_RESPONSE');
    });
    it("expects to not call persistUser if error message ", async () => {
        jest.spyOn(api, "post").mockImplementation(() => {
            return {
                data: {
                    message: 'MOCK_RESPONSE'
                }
            }
        });
        const persist = jest.spyOn(authService, 'persistUser');
        const ret = await authService.login("MOCK_EMAIL", "MOCK_PASSWORD")
        expect(persist).not.toHaveBeenCalled();
        expect(ret).toBeFalsy();
    })

    it("expects to not call persistUser if throw error ", async () => {
        jest.spyOn(api, "post").mockImplementation(() => {
            throw new Error('MOCK_ERROR')
        });
        const persist = jest.spyOn(authService, 'persistUser');
        const ret = await authService.login("MOCK_EMAIL", "MOCK_PASSWORD")
        expect(persist).not.toHaveBeenCalled();
        expect(ret).toBeFalsy();
    })

    it("expects to return register on Success ", async () => {
        jest.spyOn(api, "post").mockImplementation(() => {
            return "MOCK_RESPONSE";
        });
        const ret = await authService.register("MOCK_EMAIL", "MOCK_PASSWORD")
        expect(ret).toEqual("MOCK_RESPONSE");
    })

    it("expects to return false on error ", async () => {
        jest.spyOn(api, "post").mockImplementation(() => {
            throw new Error('MOCK_ERROR')
        });
        const ret = await authService.register("MOCK_EMAIL", "MOCK_PASSWORD")
        expect(ret).toBeFalsy();
    })

    it("expects getUserInfo to call decode if logged in ", async () => {
        jest.spyOn(authService, "isLoggedIn").mockImplementation(() => {
            return true;
        });
        decode.mockImplementation(() => "MOCK_RESPONSE");
        const ret = await authService.getUserInfo();
        expect(decode).toHaveBeenCalled();
        expect(ret).toEqual("MOCK_RESPONSE");
    })

    it("expects getUserInfo to not call decode if not logged in ", async () => {
        jest.spyOn(authService, "isLoggedIn").mockImplementation(() => {
            return false;
        });
        await authService.getUserInfo();
        expect(decode).not.toHaveBeenCalled();
    })

    it("expects getTokenExpirationDate to return null if token is not set", async () => {
        decode.mockImplementation(() => {
            return {
                exp: null
            }
        });
        const ret = await authService.getTokenExpirationDate();
        expect(ret).toEqual(null);
    })

    it("expects getTokenExpirationDate to return date ", async () => {
        decode.mockImplementation(() => {
            return {
                exp: 1233223132
            }
        });
        const ret = await authService.getTokenExpirationDate();
        expect(ret).not.toEqual(null);
    })

    it("expects isTokenExpired to compare dates", async () => {
        jest.spyOn(authService, "getTokenExpirationDate").mockImplementation(() => {
            return new Date();
        });
        const ret = await authService.isTokenExpired();
        expect(ret).toBeFalsy();
    })

    it("expects isLoggedIn to verify token", async () => {
        jest.spyOn(authService, "getAuthToken").mockImplementation(() => {
            return true;
        });
        jest.spyOn(authService, "isTokenExpired").mockImplementation(() => false);
        console.log(authService.isLoggedIn);
        const ret = await authService.isLoggedIn();
        expect(ret).toBeTruthy();
    })

    it("expects isLoggedIn in case of token expired", async () => {
        jest.spyOn(authService, "getAuthToken").mockImplementation(() => {
            return true;
        });
        jest.spyOn(authService, "isTokenExpired").mockImplementation(() => true);
        const ret = await authService.isLoggedIn();
        expect(ret).toBeFalsy();
    })

    it("expects logoutUser to clearCart", async () => {
        const clearCart = jest.spyOn(orderService, "clearCart").mockImplementation(() => {
            return true;
        });
        
        await authService.logoutUser();
        expect(clearCart).toHaveBeenCalled();
    })
});