package com.iusa.clases.controllers;

import java.util.Properties;

import javax.mail.Message;
import javax.mail.Message.RecipientType;
import javax.mail.MessagingException;
import javax.mail.Multipart;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Store;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;



public class MailConfirmacion {
    public String destiny;
    public String texto;
    public String asunto;
    private String mail;
    private String pass;
	public MailConfirmacion(String destiny, String texto, String asunto,String mail, String pass){
		this.destiny=destiny;
		this.texto=texto;
		this.asunto=asunto;
		this.mail=mail;
		this.pass=pass;
	}
     public void sendMail(){
     

     
		final String username = mail;
		final String password = pass;


		
		Properties props = new Properties();
		props.put("mail.smtp.auth", "true");
		
		props.put("mail.debug", "false");
		props.put("mail.smtp.host", "200.38.122.233");
		props.put("mail.smtp.port", "25");
       	
		
		Session session = Session.getInstance(props,
		  new javax.mail.Authenticator() {
			protected PasswordAuthentication getPasswordAuthentication() {
				return new PasswordAuthentication(username, password);
			}
		  });

		try {
			
			Message message = new MimeMessage(session);
			message.setFrom(new InternetAddress("redprofesional@iusacell.com.mx"));
			message.setRecipients(Message.RecipientType.TO,
				InternetAddress.parse(destiny));
			message.setSubject(asunto);
			message.setContent(texto, "text/html; charset=utf-8");


			Transport.send(message);


		} catch (MessagingException e) {
			e.printStackTrace();
		}
     
     }
	
}
