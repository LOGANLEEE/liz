import { puppeteerArgs } from 'lib/util';
import puppeteer from 'puppeteer';

export const getBrowser = async () => {
	const browser = await puppeteer.launch({ headless: true, args: puppeteerArgs });
	return { browser };
};
