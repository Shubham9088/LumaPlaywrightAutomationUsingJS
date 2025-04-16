import {test, expect} from '@playwright/test'
import LumaUtils from '../resources/Utilities/LumaUtils';
import { TestData } from '../resources/TestData/TestData';

test.describe("Registration test case",()=>{
    let lumaUtil;
    test.beforeEach(async({page})=>{
        lumaUtil=new LumaUtils(page);
        await page.goto("https://magento.softwaretestingboard.com/");
    });

    test("Register user with different password and conform password",async()=>{
        await lumaUtil.registerNewUser(TestData.userData.firstName,TestData.userData.lastname,TestData.userData.email,TestData.userData.password,TestData.userData.conformPassword.incorrectPassword);
        await lumaUtil.verifyText(TestData.message.conformPasswordIncorrect);
    });

    test("Register user with existing email",async()=>{
        await lumaUtil.registerNewUser(TestData.userData.firstName,TestData.userData.lastname,TestData.userData.email,TestData.userData.password,TestData.userData.conformPassword.machingPassword);
        await lumaUtil.verifyText(TestData.message.alredyUsedEmail);
    });

    test("Register user without providing any details",async()=>{
        await lumaUtil.clickPanelLink(TestData.createAccountText);
        await lumaUtil.clickButton(TestData.button.createAccount);
    });
});
