package com.iusa.clases.controllers;

import java.util.Date;
import java.util.Properties;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Store;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

public class EnviaMail {
	
	
	private String mPara;
	private String mDe;
	private String host;
	
	public EnviaMail(){
		
		this.mPara = "jorgeperro_12@hotmail.com";
		this.mDe = "jorge.rugerio14@gmail.com";
		this.host = "smtp.gmail.com";
		
	}
	
	
	
	public void envio(){

		 // Create properties, get Session  
        Properties props = new Properties();
		 // If using static Transport.send(),  
        // need to specify which host to send it to  
        props.put("mail.smtp.host", host);  
        // To see what is going on behind the scene  
        props.put("mail.debug", "true");
        props.put("mail.smtp.port", "465 ");
        Session session = Session.getInstance(props);
		
        
        try {  
            // Instantiatee a message  
            Message msg = new MimeMessage(session);  
  
            //Set message attributes  
            msg.setFrom(new InternetAddress(mDe));  
            InternetAddress[] address = {new InternetAddress(mPara)};  
            msg.setRecipients(Message.RecipientType.TO, address);  
            msg.setSubject("Test E-Mail through Java");  
            msg.setSentDate(new Date());  
  
            // Set message content  
            msg.setText("This is a test of sending a " +  
                        "plain text e-mail through Java.\n" +  
                        "Here is line 2.");  
  
            //Send the message  
            Transport.send(msg);  
        }  
        catch (MessagingException mex) {  
            // Prints all nested (chained) exceptions as well  
            mex.printStackTrace();  
        } 
		
	}
	
	

	public String getmPara() {
		return mPara;
	}

	

	public String getmDe() {
		return mDe;
	}

	

	public String getHost() {
		return host;
	}

	

}
