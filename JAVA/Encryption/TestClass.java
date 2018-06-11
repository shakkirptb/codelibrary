package com.lgi.web.platform.adfs;

import java.security.NoSuchAlgorithmException;

import javax.crypto.Cipher;

public class TestClass {

	
	public static void main(String[] args) throws NoSuchAlgorithmException {
		System.out.println(Cipher.getMaxAllowedKeyLength("AES"));
	}
}
