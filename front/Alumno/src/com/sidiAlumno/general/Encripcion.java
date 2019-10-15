package com.sidiAlumno.general;




public class Encripcion {
	
	private static final char[] bcdLookup = { '0', '1', '2', '3', '4', '5',
		'6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f' };
	
	public final String bytesToHexStr(byte[] bcd) {
		StringBuffer s = new StringBuffer(bcd.length * 2);

		for (int i = 0; i < bcd.length; i++) {
			s.append(bcdLookup[(bcd[i] >>> 4) & 0x0f]);
			s.append(bcdLookup[bcd[i] & 0x0f]);
		}

		return s.toString();
	}
	
	
	public String cifra(String str) {
		if (str == null)
			return null;
		String cifrado = "";
		String subcifrado = "";

		for (int i = 0; i < str.length(); i++) {
			subcifrado = Integer.toHexString(str.charAt(i) ^ i);
			cifrado += ((subcifrado.length() == 2) ? subcifrado : ((subcifrado
					.length() == 1) ? '0' + subcifrado
					: ((subcifrado.length() > 2) ? subcifrado.substring(0, 2)
							: "")));
		}
		return cifrado;
	}
	

	public String cifraLlave(String str){
		String cifrado = "";
		if (str == null)
			return null;
		byte llave = 49;
		byte[] buffer = str.getBytes();
		for (int n = 0; n < buffer.length; n++) {
			buffer[n] = (byte) (buffer[n] ^ llave);
		}
		cifrado = new String(buffer);
		return cifrado;
	}
	

	public String cifraLlaveHex(String str) {
		String cifrado = "";
		if (str == null)
			return null;
		byte llave = 61;
		byte[] buffer = str.getBytes();
		for (int n = 0; n < buffer.length; n++) {
			buffer[n] = (byte) (buffer[n] ^ llave);
		}
		cifrado = bytesToHexStr(buffer);
		return cifrado;
	}
	
	
	public String cifraXor(String str) {
		if (str == null)
			return null;
		String cifrado = "";
		char x = 49;
		char anterior = 0;
		char[] buffer = new char[str.length()];
		for (int n = 0; n <= str.length() - 1; n++) {
			buffer[n] = str.charAt(n);
		}
		for (int n = buffer.length - 1; n >= 0; n--) {
			buffer[n] ^= (x + ((char) buffer.length * 3) + anterior);
			anterior = buffer[n];
		}
		cifrado = new String(buffer);

		return cifrado;
	}
	
	
	public  String cifraXorHash(String str) {
		if (str == null)
			return null;
		char[] lista = { 's', 'e', 'm', 'a', 'f', 'o', 'r', 'i', 'n', 'u' };
		int posicionLista = 0;
		String cifrado = "";
		char x = 49;
		// char anterior = 0;
		char[] buffer = new char[str.length()];

		//
		for (int n = 0; n <= str.length() - 1; n++) {
			buffer[n] = str.charAt(n);
			//
			posicionLista = '0' - (buffer[n]);
			if (posicionLista < 0)
				posicionLista = -1 * (posicionLista);
			buffer[n] = lista[posicionLista];
		}
		for (int n = buffer.length - 1; n >= 0; n--) {
			buffer[n] ^= x;
		}
		cifrado = new String(buffer);
		return cifrado;
	}
	
	
	public  String descifra(String str) {
		if (str == null)
			return null;

		try {
			String descifrado = "";
			String subdescifrado;
			char descifradoTemporal = ' ';
			//
			for (int i = 0; i < str.length(); i += 2) {
				subdescifrado = str.substring(i, i + 2);
				descifradoTemporal = (char) (Integer
						.parseInt(subdescifrado, 16) ^ i / 2);
				descifrado += descifradoTemporal;
			}
			return descifrado;
		} catch (Exception e) {
			return "";
		}
	}
	

	public  String descifraLlave(String palabraCifrada) {
		try {
			byte[] buffer = palabraCifrada.getBytes();
			byte llave = 49;
			// int tamano = buffer.length;
			for (int n = 0; n < buffer.length; n++)
				buffer[n] = (byte) (buffer[n] ^ llave);
			String str = new String(buffer);
			return str;
		} catch (Exception e) {
			return "";
		}
	}


	public  String descifraLlaveHex(String palabraCifrada) {
		try {
			byte[] buffer = hexStrToBytes(palabraCifrada);
			byte llave = 61;
			// int tamano = buffer.length;
			for (int n = 0; n < buffer.length; n++)
				buffer[n] = (byte) (buffer[n] ^ llave);
			String str = new String(buffer);
			return str;
		} catch (Exception e) {
			return "";
		}
	}
	

	public  String descifraXor(String str) {
		if (str == null)
			return null;
		try {

			String descifrado = "";
			char x = 49;
			char anterior = 0;
			char anterior2 = 0;
			int entero = 0;
			char[] buffer = new char[str.length()];

			//
			for (int n = 0; n <= str.length() - 1; n++) {
				buffer[n] = str.charAt(n);
			}
			for (int n = buffer.length - 1; n >= 0; n--) {
				anterior2 = buffer[n];
				buffer[n] ^= (x + ((char) buffer.length * 3) + anterior);
				anterior = anterior2;

				// si es mayor a 256, restarle 256
				entero = buffer[n];
				System.out.println(entero + " " + buffer[n]);
				if (entero > 256) {
					buffer[n] = (char) (entero - 256);
				}
			}
			descifrado = new String(buffer);
			return descifrado;
		} catch (Exception e) {
			return "";
		}
	}
	

	public String descifraXorHash(String str) {
		if (str == null)
			return null;

		try {
			char x = 49;
			// char anterior = 0;
			// char anterior2 = 0;
			char[] lista = { 's', 'e', 'm', 'a', 'f', 'o', 'r', 'i', 'n', 'u' };
			char[] buffer = new char[str.length()];

			//
			for (int n = 0; n <= str.length() - 1; n++) {
				buffer[n] = str.charAt(n);
			}
			for (int n = buffer.length - 1; n >= 0; n--) {
				buffer[n] ^= (x);
				for (int i = 0; i <= lista.length - 1; i++) {
					if (buffer[n] == lista[i]) {
						buffer[n] = (char) ('0' + i);
					}
				}
			}
			String descifrado = new String(buffer);
			return descifrado;
		} catch (Exception e) {
			return "";
		}
	}

	public static final byte[] hexStrToBytes(String s) {
		byte[] bytes;

		bytes = new byte[s.length() / 2];

		for (int i = 0; i < bytes.length; i++) {
			bytes[i] = (byte) Integer.parseInt(s.substring(2 * i, 2 * i + 2),
					16);
		}

		return bytes;
	}

}

