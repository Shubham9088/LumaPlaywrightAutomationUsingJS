import { expect } from '@playwright/test';
import {locators} from '../Locators/locator'
import {TestData} from '../TestData/TestData'
import {logger} from './Logger'
import { link } from 'fs';

export default class LumaUtils{

    constructor(page){
        this.page=page;
    }

    /**
     * Replaces placeholders in the XPath template with actual parameter values.
     * 
     * @param {string} template The XPath template containing placeholders in the format ${key}.
     * @param {object} params An object containing key-value pairs to replace in the template.
     * @returns {string} - The formatted XPath with values inserted.
     * @author shchak
     */
    getELementXpath(template, params){
        return template.replace(/\$\{(.*?)\}/g, (_, key) => params[key]);
    }

    /**
     * Click a link with given linkText
     * 
     * @param {string} linkText link text to click
     * @author shchak
     */
    async clickPanelLink(linkText){
        const element=this.page.locator("xpath="+this.getELementXpath(locators.objByClassAndText,{className:TestData.panelHeaderClassName,text:linkText}));
        try{
            await element.click();
            logger.info("clicked "+linkText);
        }catch(error){
            logger.error(error);
        }
    }

    /**
     * Enter text in input box
     * 
     * @param {string} testID test id of a input box
     * @param {string} text Text to enter in input box
     * @author shchak
     */
    async enterTestInInputBox(testID, text){
        const element= this.page.locator("xpath="+this.getELementXpath(locators.objById,{id:testID}));
        try{
            await element.fill(text);
            logger.info("Entered text= "+text+" in input box "+testID);
        }catch(error){
             logger.error(error);
        }
    }

    /**
     * Click a button with given name
     * 
     * @param {string} buttonName The text of button to click
     * @author shchak
     */
    async clickButton(buttonName){
        const element=this.page.locator("xpath="+this.getELementXpath(locators.objButtonByText,{text:buttonName}));
        try{
            await element.click();
            logger.info("Clicked on button "+buttonName)
        }catch(error){
            logger.error(error);
        }
    }

    /**
     * Verifies that an element containing the specified text is visible on the page.
     * 
     * @param {*} message The text content to verify visibility for
     * @author shchak
     */
    async verifyText(message){
        const element= this.page.locator("xpath="+this.getELementXpath(locators.objByText,{text:message})).first();
        await expect(element).toBeVisible();
    }

    /**
     * 
     * @param {*} firstName fname of new user
     * @param {*} lastName lname of new user
     * @param {*} email email id of new user
     * @param {*} password password to login into application
     * @param {*} confirmPassword conform password 
     */
    async registerNewUser(firstName, lastName,email, password,confirmPassword){
        logger.info("Creating new user account");
        await this.clickPanelLink(TestData.createAccountText);
        logger.info("Clicked create account button");
        await this.enterTestInInputBox(TestData.inputBox.firstNameId,firstName);
        logger.info("Entered first name");
        await this.enterTestInInputBox(TestData.inputBox.lastNameId,lastName);
        logger.info("Entered last name");
        await this.enterTestInInputBox(TestData.inputBox.emailId,email);
        logger.info("Entered email");
        await this.enterTestInInputBox(TestData.inputBox.passwordId,password);
        logger.info("Entered password");
        await this.enterTestInInputBox(TestData.inputBox.conformPasswordId, confirmPassword);
        logger.info("Entered conform password");
        await this.clickButton(TestData.button.createAccount);
        logger.info("Create account button clicked");
    }

}