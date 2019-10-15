package com.metalsa.admin.util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import java.io.IOException;
import java.io.InputStream;
import java.math.BigDecimal;
import java.text.ParseException;
import java.text.SimpleDateFormat;

import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.Locale;
import java.util.Map;
import java.util.Properties;
import java.util.ResourceBundle;
import org.apache.log4j.Logger;

/**
 *
 * @author APOVS7151
 */
public class Util {

    private final static String AUTHORITY = "https://login.microsoftonline.com/common/";
    private final static String CLIENT_ID = "34514d02-2fdf-485f-8a0e-6856d9d8e6c6";

    private final static Logger logger = Logger.getLogger(Util.class);

    public Properties readProperties(String propertiesName) {
        Properties prop = new Properties();
        InputStream input = null;
        try {
            input = getClass().getClassLoader().getResourceAsStream(propertiesName);
            prop.load(input);
        } catch (IOException ex) {
            ex.printStackTrace();
        } finally {
            if (input != null) {
                try {
                    input.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
        return prop;
    }

    public String getPrivateKey() {
        Properties prp = readProperties("token.properties");
        return prp.getProperty("PRITAVE_KEY");
    }

    public String getPublicKey() {
        Properties prp = readProperties("token.properties");
        return prp.getProperty("PUBLIC_KEY");
    }

    public int getExpiration() {
        Properties prp = readProperties("token.properties");
        return Integer.parseInt(prp.getProperty("EXPIRATION"));
    }

    public static String getHorasMinutos(BigDecimal horasTrabajadas) {
        return getHorasMinutos(getMinutos(horasTrabajadas.toString()));
    }

    public static int getMinutos(String horasTrabajadas) {
        int minutos;
        try {
            String[] horas = horasTrabajadas.split("\\.");
            minutos = Integer.parseInt(horas[0]) * 60;

            BigDecimal minutosTemp;
            if (horas.length == 2) {
                minutosTemp = new BigDecimal("." + horas[1]);
                minutos += minutosTemp.multiply(new BigDecimal("60")).intValue();
            }
        } catch (NumberFormatException e) {
            minutos = 0;
        }
        return minutos;
    }

    public static String getHorasMinutos(long minutos) {
        long hrs = Math.abs(minutos / 60);
        long mins = Math.abs(minutos % 60);
        if (minutos < 0) {
            return "-" + (hrs < 10 ? "0" + hrs : hrs + "") + ":" + (mins < 10 ? "0" + mins : mins + "");
        } else {
            return (hrs < 10 ? "0" + hrs : hrs + "") + ":" + (mins < 10 ? "0" + mins : mins + "");
        }
    }

    public static String formateaFecha(Date fecha, int languageId) {
        Locale locale;
        switch (languageId) {
            case 1:
                locale = new Locale("ES", "MX");
                break;
            case 3:
                locale = new Locale("PT", "BR");
                break;
            default:
                locale = new Locale("EN", "US");
        }
        if (fecha != null) {
            SimpleDateFormat formateador = new SimpleDateFormat(
                    "dd'-'MMM'-'yyyy", locale);
            return formateador.format(fecha);
        } else {
            return null;
        }
    }

    public static Date stringToDate(String strFecha, String formato) {
        SimpleDateFormat format = new SimpleDateFormat(formato);
        Date fecha = null;
        try {
            fecha = format.parse(strFecha);
        } catch (ParseException ex) {
            ex.printStackTrace();
        }
        return fecha;
    }

    public static Date diaSiguiente(Date fechaFinal, Integer tipoJornada) {
        GregorianCalendar calendar = new GregorianCalendar();
        calendar.setTime(fechaFinal);
        if (tipoJornada == 1) {
            switch (calendar.get(Calendar.DAY_OF_WEEK)) {
                case Calendar.SATURDAY:
                    calendar.add(Calendar.DAY_OF_YEAR, 2);
                    break;
                default:
                    calendar.add(Calendar.DAY_OF_YEAR, 1);
            }
        } else {
            switch (calendar.get(Calendar.DAY_OF_WEEK)) {
                case Calendar.FRIDAY:
                    calendar.add(Calendar.DAY_OF_YEAR, 3);
                    break;
                default:
                    calendar.add(Calendar.DAY_OF_YEAR, 1);
            }
        }
        return calendar.getTime();
    }

    public static ResourceBundle getBundle(Short idLanguage) {
        ResourceBundle diccionario;
        switch (idLanguage) {
            case 1:
                diccionario = ResourceBundle.getBundle("/Bundle", new Locale("es", "MX"));
                break;
            case 2:
                diccionario = ResourceBundle.getBundle("/Bundle", new Locale("en", "US"));
                break;
            default:
                diccionario = null;
        }
        return diccionario;
    }

    public static String formateaFechaYMD(Date fecha) {
        Locale locale = new Locale("ES", "mx");
        SimpleDateFormat formateador = new SimpleDateFormat(
                "yyyy/MM/dd", locale);
        return formateador.format(fecha);
    }

    public String generaToken(String usuario, Map<String, Object> payload) {
        System.out.println("Private Key: " + getPrivateKey());
        Claims claims = Jwts.claims();
        claims.setAudience("Odix APP");
        claims.setSubject(usuario);
        claims.setExpiration(new Date(System.currentTimeMillis() + getExpiration()));
        claims.setIssuer("metalsa.com");
        claims.putAll(payload);
        return Jwts.builder()
                .signWith(SignatureAlgorithm.HS512, getPrivateKey().getBytes())
                .setClaims(claims)
                .setExpiration(new Date(System.currentTimeMillis() + getExpiration()))
                .compact();
    }

    public String getTokenUser(String token) {
        try {
            Claims body = Jwts.parser()
                    .setSigningKey(getPrivateKey())
                    .parseClaimsJws(token)
                    .getBody();

            return body.getSubject();

        } catch (JwtException | ClassCastException e) {
            System.out.println(e);
            return null;
        }
    }
}
