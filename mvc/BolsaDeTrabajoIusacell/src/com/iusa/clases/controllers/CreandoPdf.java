package com.iusa.clases.controllers;

import java.awt.Color;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.math.BigDecimal;
import java.math.BigInteger;
import java.net.MalformedURLException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import com.itextpdf.text.BaseColor;
import com.itextpdf.text.Chunk;
import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.Element;
import com.itextpdf.text.Font;
import com.itextpdf.text.Image;
import com.itextpdf.text.PageSize;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.Phrase;
import com.itextpdf.text.Rectangle;
import com.itextpdf.text.pdf.*;
import com.iusa.clases.interceptor.CaracterNoValidoException;
import com.opensymphony.xwork2.ActionSupport;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.struts2.ServletActionContext;
import org.apache.struts2.interceptor.ServletRequestAware;
import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;

public class CreandoPdf extends perfilUsuario implements ServletRequestAware {

	 private HttpServletRequest servletRequest;
	 
	private String nombreArchivo;
	private String rutaFile;
	private String rutaFinal;
	
	private String rutaFotoUsu;
	
	private String rutaSeparador;
	private String rutaSeparadorHorizontal;
	
	private String rutaCasa;
	
	private String rutaBandera;
	
	
	private String rutaSalario;
	
	private String rutaHorario;
	
	private String rutaResidencia;
	
	private String rutaViajar;
	
	private String hobieImg;
	
	private String rutaBarra;
	
	private String rutaLogoNuevo;
	
	private String rutaBarraVerticalChica;
	
	private String rutaInfografia;
	
	private String rutaDonaTalentos;
	
	private String rutaFolder;
	
	private String rutaFotoDefault;
	
	private BigDecimal dominioSoff;
	
	private String rutaPDF;
	
	private List<BigDecimal>listaIdHobie;
	private List<String>listaHomHobie;
	
	
	
	
	

	
	public CreandoPdf(String rutaFile){
		this.rutaFile = rutaFile;
	}
   
   public String executePDF(){
	   

	   HttpServletRequest request = ServletActionContext.getRequest();
       HttpSession sesion = request.getSession();

   	   

   	   try{
   	   	this.usuario=escapeChars((String) sesion.getAttribute("usuario"));

	   	String sql = "SELECT \"usuario\".\"id_postulante\",\"usuario\".\"nombre\",\"usuario\".\"apellido_paterno\",\"usuario\".\"apellido_materno\",\"usuario\".\"correo_electronico\",\"usuario\".\"area_de_interes\",\"usuario\".\"telefono\",\"usuario\".\"telefono_extra\",\"usuario\".\"nivel_de_estudios\",\"usuario\".\"area_formacion\",\"usuario\".\"fecha_nacimiento\" FROM \"usuario\"WHERE \"usuario\".\"usuario_nombre\"=:usuario";
	    Query query = session.createSQLQuery(sql).setParameter("usuario", usuario);
	    query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
	    List data = query.list();
	    for (Object object : data) {
	    	Map row = (Map) object;
	    	  this.idUsuario=(BigDecimal)row.get("id_postulante");
	    	  this.nombre=(String)row.get("nombre");
	    	  this.apellidoPaterno=(String)row.get("apellido_paterno");
	    	  this.apellidoMaterno=(String)row.get("apellido_materno");
	    	  this.telefono=(String)row.get("telefono");
	    	  this.telefono_extra=(String)row.get("telefono_extra");
	    	  this.fechaNacimiento=new SimpleDateFormat("dd/MM/yyyy").format(row.get("fecha_nacimiento"));
	    	  this.areaDeInteres=(String)row.get("area_de_interes");
	    	  
	    	}
	    

        String sql2 = "SELECT \"datos_personales\".\"rfc\",\"datos_personales\".\"curp\",\"datos_personales\".\"sexo\",\"datos_personales\".\"estado_civil\" FROM \"datos_personales\"WHERE \"datos_personales\".\"id_usuario\"=:idUsuario";
        Query query2 = session.createSQLQuery(sql2).setParameter("idUsuario", idUsuario);
        query2.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
        List data2 = query2.list();
        for (Object object : data2) {
        	Map row1 = (Map) object;
        	   this.rfc=(String)row1.get("rfc");
        	   this.curp=(String)row1.get("curp");
        	   this.estadoCivil=(String)row1.get("estado_civil");
        	   this.sexo=(String)row1.get("sexo");
        	    
        	}
        
        
/*
        String sql3 = "SELECT \"foto\".\"url_foto\"FROM \"foto\"WHERE \"foto\".\"id_usuario\"=:idUsuario";
        Query query3 = session.createSQLQuery(sql3).setParameter("idUsuario", idUsuario);
        query3.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
        List data3 = query3.list();
        for (Object object : data3) {
        	Map row2 = (Map) object;
        	   String url=(String)row2.get("url_foto");
        	   this.urlFoto="/BolsaDeTrabajoIusacell"+url;
        	   
        	}
  */      
        

        String sql8 = "SELECT \"Ubicacion\".\"calle_numero\",\"Ubicacion\".\"colonia\",\"Ubicacion\".\"municipio_delegacion\",\"Ubicacion\".\"cp\",\"Ubicacion\".\"ciudad_poblado\",\"Ubicacion\".\"estado\",\"Ubicacion\".\"nacionalidad\" FROM \"Ubicacion\"WHERE \"Ubicacion\".\"id_usuario\"=:idUsuario";
        Query query8 = session.createSQLQuery(sql8).setParameter("idUsuario", idUsuario);
        query8.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
        List data8 = query8.list();
        for (Object object : data8) {
        	Map row1 = (Map) object;
        	   this.colonia=(String)row1.get("colonia");
        	   this.ciudadPoblado=(String)row1.get("ciudad_poblado");
        	   this.cp=(String)row1.get("cp");
        	   this.calleNumero=(String)row1.get("calle_numero");
        	   this.municipioDelegacion=(String)row1.get("municipio_delegacion");
        	   this.nacionalidad=(String)row1.get("nacionalidad");
        	   this.estadoPais=(String)row1.get("estado");
        	    
        	}
	    
	   

	   String nospacename=escapeSpaces(nombre);
	   String infochar=idUsuario+"_foto.jpg";
	   this.rutaFinal = rutaFile+File.separator+"uploads"+File.separator+"curriculums"+File.separator;
	   this.rutaSeparador = rutaFile+File.separator+"images"+File.separator+"imgParaPdf"+File.separator+"sep_horizontal.png";
	   this.rutaSeparadorHorizontal = rutaFile+File.separator+"images"+File.separator+"imgParaPdf"+File.separator+"sep_vertical.png";
	   this.rutaFotoUsu =rutaFile+File.separator+"uploads"+File.separator+"photo"+File.separator+infochar;
	   this.rutaCasa = rutaFile+File.separator+"images"+File.separator+"imgParaPdf"+File.separator+"casa.png";
	   this.rutaBandera = rutaFile+File.separator+"images"+File.separator+"imgParaPdf"+File.separator+"banderas"+File.separator;
	   this.rutaSalario = rutaFile+File.separator+"images"+File.separator+"imgParaPdf"+File.separator+"salario.png";
	   this.rutaHorario = rutaFile+File.separator+"images"+File.separator+"imgParaPdf"+File.separator+"horario.png";
	   this.rutaResidencia = rutaFile+File.separator+"images"+File.separator+"imgParaPdf"+File.separator+"residencia.png";
	   this.rutaViajar = rutaFile+File.separator+"images"+File.separator+"imgParaPdf"+File.separator+"viajar.png";
	   this.hobieImg  = rutaFile+File.separator+"images"+File.separator+"imgParaPdf"+File.separator+"hobies"+File.separator;
	   this.rutaInfografia = rutaFile+File.separator+"uploads"+File.separator+"curriculums"+File.separator+idUsuario+"infograma.png";
	   this.rutaDonaTalentos = rutaFile+File.separator+"uploads"+File.separator+"curriculums"+File.separator+idUsuario+"talentos.png";
	   this.rutaFolder = rutaFile+File.separator+"uploads"+File.separator+"curriculums"+File.separator;
	   this.nombreArchivo=nospacename+"_"+apellidoPaterno+"_"+apellidoMaterno;
	   this.rutaBarra = rutaFile+File.separator+"images"+File.separator+"imgParaPdf"+File.separator+"barra_iusacell.png";
	   this.rutaLogoNuevo = rutaFile+File.separator+"images"+File.separator+"imgParaPdf"+File.separator+"logoNuevo.PNG";
	   //this.urlFoto=rutaFile+File.separator+"uploads"+File.separator+"photo"+File.separator+infochar;
	   this.rutaBarraVerticalChica = rutaFile+File.separator+"images"+File.separator+"imgParaPdf"+File.separator+"barraVerticalSmall.PNG";
	   this.rutaFotoDefault=rutaFile+File.separator+"images"+File.separator+"avatar.png";
	   Document document=new Document(PageSize.LETTER);
	    try {
	    	StringBuilder sbf = new StringBuilder();
	    	sbf.append(rutaFolder);
	    	sbf.append(File.separator);
	    	sbf.append(idUsuario);
	    	File folder = new File( sbf.toString());
	    	
	    	FolderIdGenerator fg=new FolderIdGenerator();
			String folderid=fg.nextSessionId();
			StringBuilder sbfn = new StringBuilder();
	    	sbfn.append(folder);
	    	sbfn.append(File.separator);
	    	sbfn.append(folderid);
			File foldernew=new File(sbfn.toString());
			
			if (folder.exists()) {
				deleteFolder(folder);
				boolean b=foldernew.mkdirs();

			}else if(!folder.exists()){
				boolean b=foldernew.mkdirs();

			}
			
			StringBuilder sb = new StringBuilder();
			sb.append(rutaFinal);
			sb.append(File.separator);
			sb.append(idUsuario);
			sb.append(File.separator);
			sb.append(folderid);
			sb.append(File.separator);
			sb.append(nombreArchivo);
			sb.append(".pdf");
			
			File file = new File(sb.toString());
			
	 	   PdfWriter.getInstance(document,new FileOutputStream(file));
	 	   
	 	   rutaPDF = idUsuario+File.separator+folderid+File.separator+nombreArchivo+".pdf";
	 	  System.out.println(rutaPDF);
	 	  document.setMargins(8, 8, 8, 8);
	 	  
	 	 
	 	   
	 	   document.open();
	 	   
	 	
	 	   		
					Image image = Image.getInstance (rutaSeparador);
					
					Image imagenCasa = Image.getInstance(rutaCasa);
					imagenCasa.scalePercent(40f);
					
					Image imagenSalario = Image.getInstance(rutaSalario);
					imagenSalario.scalePercent(30f);
					
					Image imagenHorario = Image.getInstance(rutaHorario);
					imagenHorario.scalePercent(30f);
					
					Image imagenViajar = Image.getInstance(rutaViajar);
					imagenViajar.scalePercent(30f);
					
					Image imagenResidencia = Image.getInstance(rutaResidencia);
					imagenResidencia.scalePercent(30f);
					
					
				
	 	 
					Font titulosRojos = new Font(Font.FontFamily.HELVETICA  ,  Font.BOLD);
					titulosRojos.setSize(11f);
					titulosRojos.setColor(205, 10, 48);
					
				
					Font labelsFont = new Font(Font.FontFamily.HELVETICA  ,  Font.BOLD);
					labelsFont.setSize(8);
					labelsFont.setColor(167, 143, 33);
					
			
					Font textNormal = new Font(Font.FontFamily.HELVETICA  , Font.NORMAL);
					textNormal.setSize(8f);
					textNormal.setColor(0, 0, 0);
					
				
					Font textNormal2 = new Font(Font.FontFamily.HELVETICA  , Font.NORMAL);
					textNormal2.setSize(8f);
					textNormal2.setColor(0, 0, 0);
					
					
					Font textBlanco = new Font(Font.FontFamily.HELVETICA  , Font.BOLD);
					textBlanco.setSize(8f);
					textBlanco.setColor(255, 255, 255);
					
					
					Font textNGrande = new Font(Font.FontFamily.HELVETICA  , Font.BOLD);
					textNGrande.setSize(8f);
					textNGrande.setColor(0, 0, 0);
					
					
					Font textGold = new Font(Font.FontFamily.HELVETICA  , Font.BOLD);
					textGold.setSize(8f);
					textGold.setColor(167, 143, 33);
					
					
					Font textNomBig = new Font(Font.FontFamily.HELVETICA  , Font.NORMAL);
					textNomBig.setSize(10f);
					textNomBig.setColor(0, 0, 0);
					
					
					Font textVerdeG = new Font(Font.FontFamily.HELVETICA  , Font.BOLD);
					textVerdeG.setSize(16f);
					textVerdeG.setColor(31, 130, 25);
					
					
					Font textRojoG = new Font(Font.FontFamily.HELVETICA  , Font.BOLD);
					textRojoG.setSize(16f);
					textRojoG.setColor(205, 10, 48);
					
					
					Font textGrisP = new Font(Font.FontFamily.HELVETICA  , Font.BOLD);
					textGrisP.setSize(66f);
					textGrisP.setColor(0, 0, 0);
					
					
	 	  
	 	  PdfPTable tablaContenedor = new PdfPTable(1);
	 	  
	 	  tablaContenedor.setWidthPercentage(100);
	 	  
	 	  PdfPCell cell1 = new PdfPCell(new Phrase("Cell 1"));
	 	  cell1.setBorder(Rectangle.NO_BORDER);
	 	  

	 	  
	 	 PdfPTable tablaSeccionesPrin = new PdfPTable(1);
	 	 
	 	 PdfPCell cabecera = new PdfPCell(Image.getInstance(String.format(rutaBarra)));
	 	 cabecera.setFixedHeight(30f);
	 	 cabecera.setVerticalAlignment(Element.ALIGN_MIDDLE);
	 	 PdfPCell separador1 = new PdfPCell(Image.getInstance(String.format(rutaSeparador)));
	 	 separador1.setFixedHeight(1f);
	 	 separador1.setVerticalAlignment(Element.ALIGN_MIDDLE);
	 	 
	 	 PdfPCell dPesonales = new PdfPCell(new Phrase("DATOS PERSONALES"));
	 	 dPesonales.setFixedHeight(140f);
	 	 PdfPCell separador2 = new PdfPCell(Image.getInstance(String.format(rutaSeparador)));
	 	 separador2.setFixedHeight(1f);
	 	separador2.setVerticalAlignment(Element.ALIGN_MIDDLE);
	 	 
	 	 PdfPCell dInfografia = new PdfPCell(new Phrase("LA INFOGRAFIA"));
	 	 dInfografia.setFixedHeight(275f);
	 	 PdfPCell separador3 = new PdfPCell(Image.getInstance(String.format(rutaSeparador)));
	 	 separador3.setFixedHeight(1f);
	 	separador3.setVerticalAlignment(Element.ALIGN_MIDDLE);
	 	
	  	 PdfPCell dTalentos = new PdfPCell(new Phrase("LOS TALENTOS, HOBBIES Y SOFTWARE"));
	  	 dTalentos.setFixedHeight(230f);
	  	 PdfPCell separador4 = new PdfPCell(Image.getInstance(String.format(rutaSeparador)));
	  	 separador4.setFixedHeight(1f);
	  	separador4.setVerticalAlignment(Element.ALIGN_MIDDLE);
	  	 
	  	 PdfPCell dExtra = new PdfPCell(new Phrase("DISPONIVILIDAD"));
	  	 dExtra.setFixedHeight(70f);
	  	 
	  	 PdfPCell dExtra2 = new PdfPCell();
	  	 dExtra2.setFixedHeight(20f);
	  	 
	  	 
	  	 
	  	 	
	  	 	cabecera.setBorder(Rectangle.NO_BORDER);
	  	 	cabecera.setHorizontalAlignment(Element.ALIGN_CENTER);
	  	 	cabecera.setVerticalAlignment(Element.ALIGN_CENTER);
	  	 	
	  	 	separador1.setBorder(Rectangle.NO_BORDER);
	  	 	separador1.setHorizontalAlignment(Element.ALIGN_CENTER);
	  	 	separador1.setVerticalAlignment(Element.ALIGN_CENTER);
	  	 	
	  	 	dPesonales.setBorder(Rectangle.NO_BORDER);
	  	 	dPesonales.setHorizontalAlignment(Element.ALIGN_CENTER);
	  	 	dPesonales.setVerticalAlignment(Element.ALIGN_CENTER);
	  	 	
	  	    separador2.setBorder(Rectangle.NO_BORDER);
	  	 	separador2.setHorizontalAlignment(Element.ALIGN_CENTER);
	  	 	separador2.setVerticalAlignment(Element.ALIGN_CENTER);
	  	 	
	  	 	dInfografia.setBorder(Rectangle.NO_BORDER);
	  	 	dInfografia.setHorizontalAlignment(Element.ALIGN_CENTER);
	  	 	dInfografia.setVerticalAlignment(Element.ALIGN_CENTER);
	  	 	
	  	 	separador3.setBorder(Rectangle.NO_BORDER);
	  	 	separador3.setHorizontalAlignment(Element.ALIGN_CENTER);
	  	 	separador3.setVerticalAlignment(Element.ALIGN_CENTER);
	  	 	
	  	 	dTalentos.setBorder(Rectangle.NO_BORDER);
	  	 	dTalentos.setHorizontalAlignment(Element.ALIGN_CENTER);
	  	 	dTalentos.setVerticalAlignment(Element.ALIGN_CENTER);
	  	 	
	  	 	separador4.setBorder(Rectangle.NO_BORDER);
	  	 	separador4.setHorizontalAlignment(Element.ALIGN_CENTER);
	  	 	separador4.setVerticalAlignment(Element.ALIGN_CENTER);
	  	 	
	  	 	dExtra.setBorder(Rectangle.NO_BORDER);
	  	 	dExtra.setHorizontalAlignment(Element.ALIGN_CENTER);
	  	 	dExtra.setVerticalAlignment(Element.ALIGN_CENTER);
	  	 	
	  	 	dExtra2.setBorder(Rectangle.NO_BORDER);
	  	 	dExtra2.setHorizontalAlignment(Element.ALIGN_CENTER);
	  	 	dExtra2.setVerticalAlignment(Element.ALIGN_CENTER);
	  	 	
	  	 
	  
	  	 	
	  	  PdfPTable datosPersonalesInterna = new PdfPTable(3);
	  	  datosPersonalesInterna.setWidthPercentage(100);
	  	  
	  	  
	  	float[] medidaCeldas45 = {220f, 190f, 80f};

	  
	  	datosPersonalesInterna.setWidths(medidaCeldas45);
	  	  

	  	  PdfPCell c1DatosP = new PdfPCell();
	  	  PdfPCell c2Ubicacion = new PdfPCell();
	  	  PdfPCell c3Idiomas = new PdfPCell();
	  	  
	  	  c1DatosP.setBorder(Rectangle.NO_BORDER);
	  	  c2Ubicacion.setBorder(Rectangle.NO_BORDER);
	  	  c3Idiomas.setBorder(Rectangle.NO_BORDER);
	  	  
	  	  

	  	  PdfPTable internaC1DatosP = new PdfPTable(2);
	  	  internaC1DatosP.setWidthPercentage(100);
	  	  
	  	
	  	  
	  	  PdfPCell cell = new PdfPCell (new Paragraph ("Datos Personales",titulosRojos));
	  	  	cell.setColspan (2);
	  	  	cell.setHorizontalAlignment (Element.ALIGN_CENTER);
	  	  	cell.setVerticalAlignment(Element.ALIGN_MIDDLE );
	  
	  	  	cell.setBorder(Rectangle.NO_BORDER);
	  	  	
	  	  PdfPTable internaC2DatosP = new PdfPTable(2);
	  	  internaC2DatosP.setWidthPercentage(100);	
	  	  
	  	float[] medidaCeldasc1DatosP = {60f, 130f};

	  	
	  	internaC2DatosP.setWidths(medidaCeldasc1DatosP);
	  	PdfPCell cellImageUsu;
	  	  try{
	  		 cellImageUsu = new PdfPCell(Image.getInstance(String.format(rutaFotoUsu)));
	  	  }catch(FileNotFoundException e){
	  		cellImageUsu = new PdfPCell(Image.getInstance(String.format(rutaFotoDefault)));
	  		  
	  	  }
	  	
	  	 
	  	  
	  	  cellImageUsu.setFixedHeight(70f);
	  	  cellImageUsu.setHorizontalAlignment(Element.ALIGN_CENTER);
	  	  cellImageUsu.setVerticalAlignment(Element.ALIGN_TOP);
	  	  cellImageUsu.setBorder(Rectangle.NO_BORDER);
	  	  
	  	  PdfPCell cellDatosPlasmados = new PdfPCell (new Paragraph ("Datos Personales",titulosRojos));
	  	  
	  	  cellDatosPlasmados.setFixedHeight(200f);
	  	  cellDatosPlasmados.setBorder(Rectangle.NO_BORDER);
	  	  
	  	 PdfPCell cellDatosPlasmados2 = new PdfPCell (new Paragraph ("Datos Personales",titulosRojos));
	  	 
	  	cellDatosPlasmados2.setFixedHeight(200f);
	  	cellDatosPlasmados2.setBorder(Rectangle.NO_BORDER);
	  	  
	  	  	PdfPTable tablaInternaDatosPlamados = new PdfPTable(2);
	  	  		tablaInternaDatosPlamados.setWidthPercentage(100);
	  	  		
	  	  		PdfPCell cellNombre = new PdfPCell (new Paragraph (nombre +" "+ apellidoPaterno + " " + apellidoMaterno,textNomBig));
	  	  		PdfPCell cellNombre2 = new PdfPCell (new Paragraph (" ",textNormal));
	  	  		cellNombre.setBorder(Rectangle.NO_BORDER);
	  	  		cellNombre2.setBorder(Rectangle.NO_BORDER);
	  	  	    cellNombre.setColspan (2);
	  	  		
	  	  	tablaInternaDatosPlamados.addCell(cellNombre);
	  	    tablaInternaDatosPlamados.addCell(cellNombre2);
	  	  	
	  	  PdfPTable tablaInternaDatosPlamados2 = new PdfPTable(1);
	  	  
	  		tablaInternaDatosPlamados2.setWidthPercentage(100);
	  		
	  	  		PdfPCell cellEmailLabel = new PdfPCell ();
	  	  		cellEmailLabel.setBorder(Rectangle.NO_BORDER);
	  	  		PdfPCell cellEmailDatoB = new PdfPCell ();
	  	  		cellEmailDatoB.setBorder(Rectangle.NO_BORDER);
	  	  		Paragraph parag1=new Paragraph ("e-Mail: ",labelsFont);
	  	  		parag1.add(new Paragraph (usuario,textNormal));
	  	  		Paragraph comb=new Paragraph(); 
	  	  		comb.add(parag1);
	  	  		
	  	  		cellEmailLabel.addElement(comb);
	  	  		
	  	  		
	  	  		
	  	  	tablaInternaDatosPlamados2.addCell(cellEmailLabel);
	  
	  	  		
		  	  	PdfPCell cellRfcLabel = new PdfPCell ();
		  	  	cellRfcLabel.setBorder(Rectangle.NO_BORDER);
	  	  		PdfPCell cellRfcDatoB = new PdfPCell ();
	  	  		cellRfcDatoB.setBorder(Rectangle.NO_BORDER);
		  	  	Paragraph parag3=new Paragraph (new Paragraph ("RFC:  ",labelsFont));
		  	  	parag3.add(new Paragraph (rfc,textNormal));
	  	  		Paragraph comb2=new Paragraph(); 
	  	  		comb2.add(parag3); 
	  	  		
	  	  		cellRfcLabel.addElement(comb2);
	  	  		
	  	  		
	  	  		tablaInternaDatosPlamados2.addCell(cellRfcLabel);
	  	  		
	  	  		
	  	  		PdfPCell cellFechaNacLabel = new PdfPCell ();
	  	  		cellFechaNacLabel.setBorder(Rectangle.NO_BORDER);
		  		PdfPCell cellFechaNacDatoB = new PdfPCell ();
		  		cellFechaNacDatoB.setBorder(Rectangle.NO_BORDER);
		  		Paragraph parag5=new Paragraph (new Paragraph ("Fecha de Nacimiento:  ",labelsFont));
	  	  		parag5.add(new Paragraph (fechaNacimiento,textNormal));
	  	  		Paragraph comb3=new Paragraph(); 
	  	  		comb3.add(parag5);
	  	  		
	  	  		cellFechaNacLabel.addElement(comb3);
		  		
		  		
		  		
		  	
		  		tablaInternaDatosPlamados2.addCell(cellFechaNacLabel);
		  		
		  		
		  		PdfPCell cellSexoLabel = new PdfPCell ();
		  		cellSexoLabel.setBorder(Rectangle.NO_BORDER);
	  	  		PdfPCell cellSexoDatoB = new PdfPCell ();
	  	  		cellSexoDatoB.setBorder(Rectangle.NO_BORDER);
		  	  	Paragraph parag7=new Paragraph (new Paragraph ("Sexo:  ",labelsFont));
	  	  		parag7.add(new Paragraph (sexo,textNormal));
	  	  		Paragraph comb4=new Paragraph(); 
	  	  		comb4.add(parag7);
	  	  		
	  	  		cellSexoLabel.addElement(comb4);
	  	  		
	  	  		tablaInternaDatosPlamados2.addCell(cellSexoLabel);
	  	  		
	  	  		
	  	  		PdfPCell cellCurpLabel = new PdfPCell ();
	  	  		cellCurpLabel.setBorder(Rectangle.NO_BORDER);
	  	  		PdfPCell cellCurpDatoB = new PdfPCell ();
	  	  		cellCurpDatoB.setBorder(Rectangle.NO_BORDER);
	  	  		
		  	  	Paragraph parag9=new Paragraph (new Paragraph ("Curp:  ",labelsFont));
	  	  		parag9.add(new Paragraph (curp,textNormal));
	  	  		Paragraph comb5=new Paragraph(); 
	  	  		comb5.add(parag9);
	  	  		
	  	  		cellCurpLabel.addElement(comb5);
	  	  		
	  	  		tablaInternaDatosPlamados2.addCell(cellCurpLabel);
	  	  	
	  	  	
	  	  	
	  	  		
		  	  	PdfPCell cellTelLabel = new PdfPCell ();
		  		cellTelLabel.setBorder(Rectangle.NO_BORDER);
		  		PdfPCell cellTelDatoB = new PdfPCell ();
		  		cellTelDatoB.setBorder(Rectangle.NO_BORDER);
		  		
		  		Paragraph parag16=new Paragraph (new Paragraph ("Telefono(s):  ",labelsFont));
		  		if(telefono_extra==null || telefono_extra==""){
		  			parag16.add(new Paragraph (telefono,textNormal));
		  		}else{
		  			parag16.add(new Paragraph (telefono+" , "+telefono_extra,textNormal));
		  		}
	  	  		Paragraph comb12=new Paragraph(); 
	  	  		comb12.add(parag16);
	  	  		
	  	  		cellTelLabel.addElement(comb12);
	  	  		
	  	  	tablaInternaDatosPlamados2.addCell(cellTelLabel);
	  	  		
//	  	  	PdfPCell cellTel2Label = new PdfPCell ();
//	  		cellTelLabel.setBorder(Rectangle.NO_BORDER);
//	  		PdfPCell cellTel2DatoB = new PdfPCell ();
//	  		cellTel2DatoB.setBorder(Rectangle.NO_BORDER);
//	  	  		
//	  	  	Paragraph parag=new Paragraph (new Paragraph ("Telefono 2:  ",labelsFont));
//  	  		parag.add(new Paragraph (telefono_extra,textNormal));
//  	  		Paragraph combext=new Paragraph(); 
//  	  		combext.add(parag);
//  	  		
//  	  		cellTel2Label.addElement(combext);
//		  		
//		  		
//	  	  		tablaInternaDatosPlamados2.addCell(cellTel2Label);
		  		
	  	  	
	  	  	
		  
		  	
		  	
		  	
		  
		  	
		  	
	  	  
		  	
		  	cellDatosPlasmados.addElement(tablaInternaDatosPlamados);
		  	cellDatosPlasmados.addElement(tablaInternaDatosPlamados2);
		  	
	  	  internaC1DatosP.addCell (cell);
	  	  internaC2DatosP.addCell (cellImageUsu);
	  	  internaC2DatosP.addCell (cellDatosPlasmados);
	  	  internaC2DatosP.addCell (cellDatosPlasmados2);
	  	  

		  c1DatosP.addElement(internaC1DatosP);
		  c1DatosP.addElement(internaC2DatosP);
		  	
		  	
		 
		  PdfPTable internaC2DatosU = new PdfPTable(2);
		  internaC2DatosU.setWidthPercentage(100);
		  
		  PdfPCell cellU = new PdfPCell (new Paragraph ("Datos de Ubicación",titulosRojos));
		  	  cellU.setColspan (2);
		  	  cellU.setHorizontalAlignment (Element.ALIGN_CENTER);
		  	  cellU.setVerticalAlignment(Element.ALIGN_MIDDLE );
		  	  cellU.setBorder(Rectangle.NO_BORDER);
	  	  	  
	  	  	  
	  	  	 PdfPTable internaC3DatosU = new PdfPTable(2);
	  	  	internaC3DatosU.setWidthPercentage(100);
	  	  	
	  	  float[] medidaInternaC3DatosU = {40f, 130f};

		  	
	  	internaC3DatosU.setWidths(medidaInternaC3DatosU);
	  	  	
	  	  	PdfPCell cellImageCasa = new PdfPCell();
	  	  	
	  	  	cellImageCasa.addElement(imagenCasa);
	  	  	cellImageCasa.setBorder(Rectangle.NO_BORDER);
	  	  
	  	  cellImageUsu.setFixedHeight(60f);
	  	  cellImageUsu.setHorizontalAlignment(Element.ALIGN_CENTER);
	  	  cellImageUsu.setVerticalAlignment(Element.ALIGN_MIDDLE);
	  	  cellImageUsu.setBorder(Rectangle.NO_BORDER);
	  	  
	  	PdfPCell cellDatosPlamadosU = new PdfPCell();
	  	cellDatosPlamadosU.setBorder(Rectangle.NO_BORDER);
	  	  
	  	cellDatosPlamadosU.setFixedHeight(200f);
	  	 
	  	PdfPTable tablaInternaDatosPlamadosU = new PdfPTable(1);
	  	tablaInternaDatosPlamadosU.setWidthPercentage(100);  	
	  	  	
	  	  	
	  		PdfPCell cellCalleLabel = new PdfPCell ();
	  		cellCalleLabel.setBorder(Rectangle.NO_BORDER);
	  	
	  		
	  		
	  		Paragraph parag10=new Paragraph (new Paragraph ("Calle y Número: ",labelsFont));
  	  		parag10.add(new Paragraph (calleNumero,textNormal));
  	  		Paragraph comb6=new Paragraph(); 
  	  		comb6.add(parag10);
  	  		
  	  		cellCalleLabel.addElement(comb6);
	  		
	  		tablaInternaDatosPlamadosU.addCell(cellCalleLabel);
	  		
	  	
	  		
	  		
	  		PdfPTable tablaInternaDatosPlamadosU2 = new PdfPTable(1);
	  
	  		tablaInternaDatosPlamadosU2.setWidthPercentage(100);
	  		
	  		
		
	  		PdfPCell cellColoniaLabel = new PdfPCell ();
	  		cellColoniaLabel.setBorder(Rectangle.NO_BORDER);
	  		PdfPCell cellColoniaDatoB = new PdfPCell ();
	  		cellColoniaDatoB.setBorder(Rectangle.NO_BORDER);
	  		
	  		Paragraph parag11=new Paragraph (new Paragraph ("Colonia:  ",labelsFont));
  	  		parag11.add(new Paragraph (colonia,textNormal));
  	  		Paragraph comb7=new Paragraph(); 
  	  		comb7.add(parag11);
  	  		
  	  		cellColoniaLabel.addElement(comb7);
	  		
	  		tablaInternaDatosPlamadosU2.addCell(cellColoniaLabel);
	  	
	  		
	  		
	  		PdfPCell cellEstadoLabel = new PdfPCell ();
	  		cellEstadoLabel.setBorder(Rectangle.NO_BORDER);
	  		PdfPCell cellEstadoDatoB = new PdfPCell ();
	  		cellEstadoDatoB.setBorder(Rectangle.NO_BORDER);
	  		
	  		Paragraph parag12=new Paragraph (new Paragraph ("Estado:  ",labelsFont));
  	  		parag12.add(new Paragraph (estadoPais,textNormal));
  	  		Paragraph comb8=new Paragraph(); 
  	  		comb8.add(parag12);
  	  		
  	  		cellEstadoLabel.addElement(comb8);
	  		
	  		tablaInternaDatosPlamadosU2.addCell(cellEstadoLabel);
	  		
	  		
	  		PdfPCell cellCiudadLabel = new PdfPCell ();
	  		cellCiudadLabel.setBorder(Rectangle.NO_BORDER);
	  		PdfPCell cellCiudadDatoB = new PdfPCell ();
	  		cellCiudadDatoB.setBorder(Rectangle.NO_BORDER);
	  		
	  		
	  	
  	
	  		tablaInternaDatosPlamadosU.addCell(cellCiudadLabel);
	  		
  		
  			PdfPCell cellMunicipioLabel = new PdfPCell ();
  			cellMunicipioLabel.setBorder(Rectangle.NO_BORDER);
	  		PdfPCell cellMunicipioDatoB = new PdfPCell ();
	  		cellMunicipioDatoB.setBorder(Rectangle.NO_BORDER);
	  		
	  		Paragraph parag14=new Paragraph (new Paragraph ("Municipio/Delegación:  ",labelsFont));
  	  		parag14.add(new Paragraph (municipioDelegacion,textNormal));
  	  		Paragraph comb10=new Paragraph(); 
  	  		comb10.add(parag14);
  	  		
  	  		cellMunicipioLabel.addElement(comb10);
	  		
	  		tablaInternaDatosPlamadosU2.addCell(cellMunicipioLabel);
	  		
	  		
	  		PdfPCell cellCpLabel = new PdfPCell ();
	  		cellCpLabel.setBorder(Rectangle.NO_BORDER);
	  		PdfPCell cellCpDatoB = new PdfPCell ();
	  		cellCpDatoB.setBorder(Rectangle.NO_BORDER);
	  		
	  		Paragraph parag15=new Paragraph (new Paragraph ("Codigo Postal:  ",labelsFont));
  	  		parag15.add(new Paragraph (cp,textNormal));
  	  		Paragraph comb11=new Paragraph(); 
  	  		comb11.add(parag15);
  	  		
  	  		cellCpLabel.addElement(comb11);
	  		
	  		
	  		tablaInternaDatosPlamadosU2.addCell(cellCpLabel);
	  		
	  		
	  		
	  	  	
	  	  	
	  	  	
	  	  	
	  	  	
	  	  
	  	cellDatosPlamadosU.addElement(tablaInternaDatosPlamadosU);
	  	cellDatosPlamadosU.addElement(tablaInternaDatosPlamadosU2);
		  
		  internaC2DatosU.addCell (cellU);
		  internaC3DatosU.addCell(cellImageCasa);
		  internaC3DatosU.addCell(cellDatosPlamadosU);
		  
		  c2Ubicacion.addElement(internaC2DatosU);	  
		  c2Ubicacion.addElement(internaC3DatosU);
		  
		  
		  
			  	
		
		 PdfPTable internaC1DatosI = new PdfPTable(2);
		 internaC1DatosI.setWidthPercentage(100);
		 
		 PdfPCell cellI = new PdfPCell (new Paragraph ("Idiomas",titulosRojos));
		  	cellI.setColspan (2);
		  	cellI.setHorizontalAlignment (Element.ALIGN_CENTER);
		  	cellI.setVerticalAlignment(Element.ALIGN_MIDDLE );
		  	cellI.setBorder(Rectangle.NO_BORDER);

	  	  	
	  	  internaC1DatosI.addCell(cellI);
	  	  
	  	  PdfPTable internaC2DatosI = new PdfPTable(3);
	  	  internaC2DatosI.setWidthPercentage(100);
	  	  	
	  	  
	  	float[] medidaInternaC2DatosI = {15f, 40f, 25f};


	  	internaC2DatosI.setWidths(medidaInternaC2DatosI);
	  	  	
	  	  String sql5 = "SELECT \"idioma_aux\".\"id_idioma_aux\",\"idioma\".\"idioma\", \"idioma_aux\".\"dominio\", \"idioma\".\"id_idioma\" FROM \"idioma\",\"idioma_aux\" WHERE \"idioma_aux\".\"id_usuario\"=:idUsuario AND \"idioma_aux\".\"id_idioma\"=\"idioma\".\"id_idioma\"";
	        Query query5 = session.createSQLQuery(sql5).setParameter("idUsuario", idUsuario);
	        query5.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
	        List data5 = query5.list();
	        for (Object object : data5) {
	        	Map row4 = (Map) object;
	        	
	            this.idIdioma=(BigDecimal)row4.get("id_idioma_aux");
	        	this.idioma=(String)row4.get("idioma");
	        	this.dominio=(BigDecimal)row4.get("dominio");
	        	this.numIdioma=(BigDecimal)row4.get("id_idioma");
	        	
	        	String numeroIdiomaAux = numIdioma.toString();
	        	
	        	String dominioIdioma = dominio.toString();
	        	
	        	
	        			
	        	PdfPCell baderaIdioma = new PdfPCell (Image.getInstance(String.format(rutaBandera + numeroIdiomaAux+".png")));
	        	baderaIdioma.setHorizontalAlignment(Element.ALIGN_CENTER);
	        	baderaIdioma.setBorder(Rectangle.NO_BORDER);
	        	baderaIdioma.setFixedHeight(10f);
		  		PdfPCell nombreIdioma = new PdfPCell (new Paragraph (idioma,textNormal));
		  		nombreIdioma.setBorder(Rectangle.NO_BORDER);
		  		PdfPCell numeroDominio = new PdfPCell (new Paragraph (dominioIdioma+"%",textNormal));
		  		numeroDominio.setBorder(Rectangle.NO_BORDER);
		  		
		  		internaC2DatosI.addCell(baderaIdioma);
		  		internaC2DatosI.addCell(nombreIdioma);
		  		internaC2DatosI.addCell(numeroDominio);
	        	
	        	}
  	  
		c3Idiomas.addElement(internaC1DatosI);
		c3Idiomas.addElement(internaC2DatosI);
		  	
		  	
		  
		
		

		  	datosPersonalesInterna.addCell(c1DatosP);
		  	datosPersonalesInterna.addCell(c2Ubicacion);
		  	datosPersonalesInterna.addCell(c3Idiomas);
		 

		  	
		  	dPesonales.addElement(datosPersonalesInterna);
		  	
		  	
	  
		  	float[] medidaCeldas3 = {2f, 20f, 2f, 20f, 2f};	
	
		  	

	  	 	
		  	PdfPTable informacionInternaTalentos = new PdfPTable(7);
		  	informacionInternaTalentos.setWidthPercentage(100);
		  	
		  	
		  	
		  	 PdfPCell talentosCotenedor = new PdfPCell();
		  	 talentosCotenedor.setBorder(Rectangle.NO_BORDER);

		  	 PdfPCell personalidadCotenedor = new PdfPCell();
		  	 personalidadCotenedor.setBorder(Rectangle.NO_BORDER);
		  	 PdfPCell hobiesCotenedor = new PdfPCell();
		  	 hobiesCotenedor.setBorder(Rectangle.NO_BORDER);
		  	 PdfPCell softwareCotenedor = new PdfPCell();
		  	 softwareCotenedor.setBorder(Rectangle.NO_BORDER);
		  	 PdfPCell sepradorVertical = new PdfPCell();
		  	 sepradorVertical.setBorder(Rectangle.NO_BORDER);
		  	 
		  
		  	 
		  	 

		  	 
		  	PdfPTable talentosCotenedorTable = new PdfPTable(1);
		  	talentosCotenedorTable.setWidthPercentage(100);
		  	
		  	 PdfPCell cell1talentosCotenedorTable = new PdfPCell(new Paragraph ("Talentos",titulosRojos));
		  	 cell1talentosCotenedorTable.setHorizontalAlignment (Element.ALIGN_CENTER);
		  	 cell1talentosCotenedorTable.setBorder(Rectangle.NO_BORDER);
		  	 Image imageDona = Image.getInstance(String.format(rutaDonaTalentos));
		  	 imageDona.scaleAbsolute(160, 160);
		  	 PdfPCell cell2talentosCotenedorTable = new PdfPCell();
		  	 cell2talentosCotenedorTable.addElement(imageDona);
		  	 cell2talentosCotenedorTable.setBorder(Rectangle.NO_BORDER);
		  	 	

		  	talentosCotenedorTable.addCell(cell1talentosCotenedorTable);
		  	talentosCotenedorTable.addCell(cell2talentosCotenedorTable);
		  	
		  	talentosCotenedor.addElement(talentosCotenedorTable);
		  	
		  	
		  	 

		  	
		  	PdfPTable personalidadCotenedorTable = new PdfPTable(1);
		  	personalidadCotenedorTable.setWidthPercentage(100);
		  	
		  	 PdfPCell cell1personalidadCotenedorTable = new PdfPCell(new Paragraph ("Personalidad",titulosRojos));
		  	cell1personalidadCotenedorTable.setHorizontalAlignment (Element.ALIGN_CENTER);
		  	 cell1personalidadCotenedorTable.setBorder(Rectangle.NO_BORDER);
		  	 PdfPCell cell2personalidadCotenedorTable = new PdfPCell();
		  	 cell2personalidadCotenedorTable.setBorder(Rectangle.NO_BORDER);
		  	 

		  	 	PdfPTable internaPersoCell2 = new PdfPTable(2);
		  	
		  	 	internaPersoCell2.setWidthPercentage(100);
		  	 	
		  	 	
		  	 	

				 
				 String sql9usu = "SELECT \"identidad\".\"identidad\",\"identidad\".\"id_identidad\" FROM \"identidad\", \"identidad_aux\" WHERE \"identidad\".\"categoria_identidad\"='Persuasion' AND \"identidad_aux\".\"id_identidad\"=\"identidad\".\"id_identidad\" AND \"identidad_aux\".\"id_usuario\"=:idUsuario";
			        Query query9usu = session.createSQLQuery(sql9usu).setParameter("idUsuario", idUsuario);
			        query9usu.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			        List data9usu = query9usu.list();
			        for (Object object : data9usu) {
			         Map row9usu = (Map) object;
			              String persu =(String)row9usu.get("identidad");
			              
			              PdfPCell cellTipoPerso1 = new PdfPCell (new Phrase("Persuasión",textBlanco));
			              cellTipoPerso1.setBackgroundColor(new BaseColor(124, 204, 193));
			              cellTipoPerso1.setFixedHeight(20f);
			              cellTipoPerso1.setVerticalAlignment(Element.ALIGN_MIDDLE);
			              cellTipoPerso1.setBorder(Rectangle.NO_BORDER);
			              cellTipoPerso1.setPaddingLeft(6f);
			              
			              PdfPCell cellTipoPersoDB1 = new PdfPCell (new Phrase(persu,textNGrande));
			              cellTipoPersoDB1.setBackgroundColor(new BaseColor(230, 230, 230));
			              cellTipoPersoDB1.setFixedHeight(20f);
			              cellTipoPersoDB1.setVerticalAlignment(Element.ALIGN_MIDDLE);
			              cellTipoPersoDB1.setBorder(Rectangle.NO_BORDER);
			              cellTipoPersoDB1.setPaddingLeft(6f);
			              
			              
			              PdfPCell SepaPersu1 = new PdfPCell (new Phrase(" ",titulosRojos));
					      PdfPCell SepaPersu2 = new PdfPCell (new Phrase(" ",titulosRojos));
					        
					        SepaPersu1.setFixedHeight(10f);
					        SepaPersu1.setBorder(Rectangle.NO_BORDER);
					        SepaPersu2.setFixedHeight(10f);
					        SepaPersu2.setBorder(Rectangle.NO_BORDER);
			              
			              internaPersoCell2.addCell(cellTipoPerso1);
			              internaPersoCell2.addCell(cellTipoPersoDB1);
			              
			              internaPersoCell2.addCell(SepaPersu1);
				          internaPersoCell2.addCell(SepaPersu2);
			       
			         }
			        
			       
		              

			        
			        String sql10usu = "SELECT \"identidad\".\"identidad\",\"identidad\".\"id_identidad\" FROM \"identidad\" ,\"identidad_aux\" WHERE \"identidad\".\"categoria_identidad\"='Constancia' AND \"identidad_aux\".\"id_identidad\"=\"identidad\".\"id_identidad\" AND \"identidad_aux\".\"id_usuario\"=:idUsuario";
			        Query query10usu = session.createSQLQuery(sql10usu).setParameter("idUsuario", idUsuario);
			        query10usu.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			        List data10usu = query10usu.list();
			        for (Object object : data10usu) {
			         Map row10usu = (Map) object;
			              String consta =(String)row10usu.get("identidad");
			              
			              PdfPCell cellTipoPerso2 = new PdfPCell (new Phrase("Constancia",textBlanco));
			              cellTipoPerso2.setBackgroundColor(new BaseColor(204, 125, 125));
			              cellTipoPerso2.setFixedHeight(20f);
			              cellTipoPerso2.setVerticalAlignment(Element.ALIGN_MIDDLE);
			              cellTipoPerso2.setBorder(Rectangle.NO_BORDER);
			              cellTipoPerso2.setPaddingLeft(6f);
			              
			              PdfPCell cellTipoPersoDB2 = new PdfPCell (new Phrase(consta,textNGrande));
			              cellTipoPersoDB2.setBackgroundColor(new BaseColor(230, 230, 230));
			              cellTipoPersoDB2.setFixedHeight(20f);
			              cellTipoPersoDB2.setVerticalAlignment(Element.ALIGN_MIDDLE);
			              cellTipoPersoDB2.setBorder(Rectangle.NO_BORDER);
			              cellTipoPersoDB2.setPaddingLeft(6f);
			              
			              PdfPCell SepaPersu1 = new PdfPCell (new Phrase(" ",titulosRojos));
					      PdfPCell SepaPersu2 = new PdfPCell (new Phrase(" ",titulosRojos));
					        
					        SepaPersu1.setFixedHeight(10f);
					        SepaPersu1.setBorder(Rectangle.NO_BORDER);
					        SepaPersu2.setFixedHeight(10f);
					        SepaPersu2.setBorder(Rectangle.NO_BORDER);
			              
			              internaPersoCell2.addCell(cellTipoPerso2);
			              internaPersoCell2.addCell(cellTipoPersoDB2);
			              
			              internaPersoCell2.addCell(SepaPersu1);
				          internaPersoCell2.addCell(SepaPersu2);
			              
			             
			              
			         }
				 

			        
			        String sql11usu = "SELECT \"identidad\".\"identidad\",\"identidad\".\"id_identidad\" FROM \"identidad\",\"identidad_aux\" WHERE \"identidad\".\"categoria_identidad\"='Apego' AND \"identidad_aux\".\"id_identidad\"=\"identidad\".\"id_identidad\" AND \"identidad_aux\".\"id_usuario\"=:idUsuario";
			        Query query11usu = session.createSQLQuery(sql11usu).setParameter("idUsuario", idUsuario);
			        query11usu.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			        List data11usu = query11usu.list();
			        for (Object object : data11usu) {
			         Map row11usu = (Map) object;
			              String apeg =(String)row11usu.get("identidad");
			              
			              
			              PdfPCell cellTipoPerso3 = new PdfPCell (new Phrase("Apego",textBlanco));
			              cellTipoPerso3.setBackgroundColor(new BaseColor(189, 127, 204));
			              cellTipoPerso3.setFixedHeight(20f);
			              cellTipoPerso3.setVerticalAlignment(Element.ALIGN_MIDDLE);
			              cellTipoPerso3.setBorder(Rectangle.NO_BORDER);
			              cellTipoPerso3.setPaddingLeft(6f);
			              
			              
			              PdfPCell cellTipoPersoDB3 = new PdfPCell (new Phrase(apeg,textNGrande));
			              cellTipoPersoDB3.setBackgroundColor(new BaseColor(230, 230, 230));
			              cellTipoPersoDB3.setFixedHeight(20f);
			              cellTipoPersoDB3.setVerticalAlignment(Element.ALIGN_MIDDLE);
			              cellTipoPersoDB3.setBorder(Rectangle.NO_BORDER);
			              cellTipoPersoDB3.setPaddingLeft(6f);
			              
			              PdfPCell SepaPersu1 = new PdfPCell (new Phrase(" ",titulosRojos));
					      PdfPCell SepaPersu2 = new PdfPCell (new Phrase(" ",titulosRojos));
					        
					        SepaPersu1.setFixedHeight(10f);
					        SepaPersu1.setBorder(Rectangle.NO_BORDER);
					        SepaPersu2.setFixedHeight(10f);
					        SepaPersu2.setBorder(Rectangle.NO_BORDER);
			              
			              internaPersoCell2.addCell(cellTipoPerso3);
			              internaPersoCell2.addCell(cellTipoPersoDB3);
			              
			              internaPersoCell2.addCell(SepaPersu1);
				          internaPersoCell2.addCell(SepaPersu2);
			         }
				 
	
				 
			        String sql12usu = "SELECT \"identidad\".\"identidad\",\"identidad\".\"id_identidad\" FROM \"identidad\", \"identidad_aux\" WHERE \"identidad\".\"categoria_identidad\"='Empuje' AND \"identidad_aux\".\"id_identidad\"=\"identidad\".\"id_identidad\" AND \"identidad_aux\".\"id_usuario\"=:idUsuario";
			        Query query12usu = session.createSQLQuery(sql12usu).setParameter("idUsuario", idUsuario);
			        query12usu.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			        List data12usu = query12usu.list();
			        for (Object object : data12usu) {
			         Map row12usu = (Map) object;
			              
			              String empu =(String)row12usu.get("identidad");
			            
			              PdfPCell cellTipoPerso4 = new PdfPCell (new Phrase("Empuje",textBlanco));
			              cellTipoPerso4.setBackgroundColor(new BaseColor(125, 130, 204));
			              cellTipoPerso4.setFixedHeight(20f);
			              cellTipoPerso4.setVerticalAlignment(Element.ALIGN_MIDDLE);
			              cellTipoPerso4.setBorder(Rectangle.NO_BORDER);
			              cellTipoPerso4.setPaddingLeft(6f);
			              
			              
			              PdfPCell cellTipoPersoDB4 = new PdfPCell (new Phrase(empu,textNGrande));
			              cellTipoPersoDB4.setBackgroundColor(new BaseColor(230, 230, 230));
			              cellTipoPersoDB4.setFixedHeight(20f);
			              cellTipoPersoDB4.setVerticalAlignment(Element.ALIGN_MIDDLE);
			              cellTipoPersoDB4.setBorder(Rectangle.NO_BORDER);
			              cellTipoPersoDB4.setPaddingLeft(6f);
			              
			              PdfPCell SepaPersu1 = new PdfPCell (new Phrase(" ",titulosRojos));
					      PdfPCell SepaPersu2 = new PdfPCell (new Phrase(" ",titulosRojos));
					        
					        SepaPersu1.setFixedHeight(10f);
					        SepaPersu1.setBorder(Rectangle.NO_BORDER);
					        SepaPersu2.setFixedHeight(10f);
					        SepaPersu2.setBorder(Rectangle.NO_BORDER);
					        
			              
			              internaPersoCell2.addCell(cellTipoPerso4);
			              internaPersoCell2.addCell(cellTipoPersoDB4);
			              
			              internaPersoCell2.addCell(SepaPersu1);
				          internaPersoCell2.addCell(SepaPersu2);
			         }

		  	 	
		  	 	
		  	 	
			      	
		  	cell2personalidadCotenedorTable.addElement(internaPersoCell2);
		  	cell2personalidadCotenedorTable.setVerticalAlignment(Element.ALIGN_MIDDLE);
		  	 
		  	personalidadCotenedorTable.addCell(cell1personalidadCotenedorTable);
		  	personalidadCotenedorTable.addCell(cell2personalidadCotenedorTable);
		  	
		  	personalidadCotenedor.addElement(personalidadCotenedorTable);
		  	 

		  	
		  	PdfPTable hobiesCotenedorTable = new PdfPTable(1);
		  	hobiesCotenedorTable.setWidthPercentage(100);
		  	
		  	 PdfPCell cell1hobiesCotenedorTable = new PdfPCell(new Paragraph ("Hobbies",titulosRojos));
		  	 cell1hobiesCotenedorTable.setHorizontalAlignment (Element.ALIGN_CENTER);
		  	 cell1hobiesCotenedorTable.setBorder(Rectangle.NO_BORDER);
		  	 PdfPCell cell2hobiesCotenedorTable = new PdfPCell(new Paragraph ("aqui van los hobbies",titulosRojos));
		  	 cell2hobiesCotenedorTable.setBorder(Rectangle.NO_BORDER);
		  	 
		  	 
		  	 

		  	PdfPTable contieneImgCell2HobiesTable = new PdfPTable(5);
		  	contieneImgCell2HobiesTable.setWidthPercentage(100);
		  	
		  	
			float[] medidaCeldas2 = {2f, 20f, 2f, 20f, 2f};


			contieneImgCell2HobiesTable.setWidths(medidaCeldas2);
		  	
		  	
		  		
		  		PdfPCell c1F1 = new PdfPCell(new Paragraph (" ",titulosRojos));
		  		c1F1.setBorder(Rectangle.NO_BORDER);
		  		PdfPCell c2F1 = new PdfPCell();
		  		c2F1.setBorder(Rectangle.NO_BORDER);
		  		PdfPCell c3F1 = new PdfPCell(new Paragraph (" ",titulosRojos));
		  		c3F1.setBorder(Rectangle.NO_BORDER);
		  		PdfPCell c4F1 = new PdfPCell();
		  		c4F1.setBorder(Rectangle.NO_BORDER);
		  		PdfPCell c5F1 = new PdfPCell(new Paragraph (" ",titulosRojos));
		  		c5F1.setBorder(Rectangle.NO_BORDER);
		  		
		  		
		  		
		  		PdfPCell c1F2 = new PdfPCell(new Paragraph (" ",titulosRojos));
		  		c1F2.setBorder(Rectangle.NO_BORDER);
		  		PdfPCell c2F2 = new PdfPCell(new Paragraph (" ",titulosRojos));
		  		c2F2.setBorder(Rectangle.NO_BORDER);
		  		PdfPCell c3F2 = new PdfPCell(new Paragraph (" ",titulosRojos));
		  		c3F2.setBorder(Rectangle.NO_BORDER);
		  		PdfPCell c4F2 = new PdfPCell(new Paragraph (" ",titulosRojos));
		  		c4F2.setBorder(Rectangle.NO_BORDER);
		  		PdfPCell c5F2 = new PdfPCell(new Paragraph (" ",titulosRojos));
		  		c5F2.setBorder(Rectangle.NO_BORDER);
		  		
		  		
		  		
		  		
		  		PdfPCell c1F3 = new PdfPCell(new Paragraph (" ",titulosRojos));
		  		c1F3.setBorder(Rectangle.NO_BORDER);
		  		PdfPCell c2F3 = new PdfPCell();
		  		c2F3.setBorder(Rectangle.NO_BORDER);
		  		PdfPCell c3F3 = new PdfPCell(new Paragraph (" ",titulosRojos));
		  		c3F3.setBorder(Rectangle.NO_BORDER);
		  		PdfPCell c4F3 = new PdfPCell();
		  		c4F3.setBorder(Rectangle.NO_BORDER);
		  		PdfPCell c5F3 = new PdfPCell(new Paragraph (" ",titulosRojos));
		  		c5F3.setBorder(Rectangle.NO_BORDER);
		  		
		  		
		  		
		  		PdfPCell c1F4 = new PdfPCell(new Paragraph (" ",titulosRojos));
		  		c1F4.setBorder(Rectangle.NO_BORDER);
		  		PdfPCell c2F4 = new PdfPCell(new Paragraph (" ",titulosRojos));
		  		c2F4.setBorder(Rectangle.NO_BORDER);
		  		PdfPCell c3F4 = new PdfPCell(new Paragraph (" ",titulosRojos));
		  		c3F4.setBorder(Rectangle.NO_BORDER);
		  		PdfPCell c4F4 = new PdfPCell(new Paragraph (" ",titulosRojos));
		  		c4F4.setBorder(Rectangle.NO_BORDER);
		  		PdfPCell c5F4 = new PdfPCell(new Paragraph (" ",titulosRojos));
		  		c5F4.setBorder(Rectangle.NO_BORDER);
		  		
		  		
		  		
		  		PdfPCell c1F5 = new PdfPCell(new Paragraph (" ",titulosRojos));
		  		c1F5.setBorder(Rectangle.NO_BORDER);
		  		PdfPCell c2F5 = new PdfPCell();
		  		c2F5.setBorder(Rectangle.NO_BORDER);
		  		PdfPCell c3F5 = new PdfPCell(new Paragraph (" ",titulosRojos));
		  		c3F5.setBorder(Rectangle.NO_BORDER);
		  		PdfPCell c4F5 = new PdfPCell();
		  		c4F5.setBorder(Rectangle.NO_BORDER);
		  		PdfPCell c5F5 = new PdfPCell(new Paragraph (" ",titulosRojos));
		  		c5F5.setBorder(Rectangle.NO_BORDER);
		  		
		  		
		  		
		  		PdfPCell c1F6 = new PdfPCell(new Paragraph (" ",titulosRojos));
		  		c1F6.setBorder(Rectangle.NO_BORDER);
		  		PdfPCell c2F6 = new PdfPCell(new Paragraph (" ",titulosRojos));
		  		c2F6.setBorder(Rectangle.NO_BORDER);
		  		PdfPCell c3F6 = new PdfPCell(new Paragraph (" ",titulosRojos));
		  		c3F6.setBorder(Rectangle.NO_BORDER);
		  		PdfPCell c4F6 = new PdfPCell(new Paragraph (" ",titulosRojos));
		  		c4F6.setBorder(Rectangle.NO_BORDER);
		  		PdfPCell c5F6 = new PdfPCell(new Paragraph (" ",titulosRojos));
		  		c5F6.setBorder(Rectangle.NO_BORDER);
		  		
		  		
		  		

		  	
		  	
		  		listaIdHobie=new ArrayList<BigDecimal>();
		  		listaHomHobie=new ArrayList<String>();
		  	 
		  	String sqlHob = "SELECT \"hobbie\".\"hobbie\",\"aux_hob\".\"id_hobbie\",\"aux_hob\".\"casilla\" FROM \"hobbie\",\"aux_hob\" WHERE \"aux_hob\".\"id_usuario\"=:idUsuario AND \"aux_hob\".\"id_hobbie\"=\"hobbie\".\"id_hob\"";
		    Query queryHob = session.createSQLQuery(sqlHob).setParameter("idUsuario", idUsuario);
		    queryHob.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		    List data1 = queryHob.list();
		    
		   int f = 1;
		    
		    for (Object object : data1) {
		    	Map rowHob = (Map) object;

		    	
		    	 String hobbie =  (String) rowHob.get("hobbie");
		         BigDecimal id_hobbie = (BigDecimal) rowHob.get("id_hobbie");
		         
		         listaHomHobie.add(hobbie);
		         listaIdHobie.add(id_hobbie);
		         
		         if(f == 1){
		        	 
		        	 PdfPTable tableHobieInterna = new PdfPTable(1);
		        	 tableHobieInterna.setWidthPercentage(100);
		        	 
		 		  	 
		 		  	 PdfPCell cell2ContieneImgH = new PdfPCell(Image.getInstance(String.format(hobieImg + id_hobbie+".png")));
		 		  	 PdfPCell cell4ContieneImgH = new PdfPCell(new Paragraph (hobbie,textNormal2));
		 		  	 
		        	 
		 		  
		 		  	 
		        	 c2F1.setImage(Image.getInstance(String.format(hobieImg + id_hobbie+".png")));
		        	 c2F2.setPhrase(new Paragraph (hobbie,textNormal2));
		        	 
		         }
		         
		         
		         if(f == 2){
		        	 
		        	 PdfPTable tableHobieInterna = new PdfPTable(1);
		        	 tableHobieInterna.setWidthPercentage(100);
		 		  	 
		 		  	 PdfPCell cell2ContieneImgH = new PdfPCell(Image.getInstance(String.format(hobieImg + id_hobbie+".png")));
		 		  	
		 		  	 PdfPCell cell4ContieneImgH = new PdfPCell(new Paragraph (hobbie,titulosRojos));
		 		  	 
		 		  	
		        	 
		 		  	
		        	 
		        	 c4F1.setImage(Image.getInstance(String.format(hobieImg + id_hobbie+".png")));
		        	 c4F2.setPhrase(new Paragraph (hobbie,textNormal2));
		        	 
		         }
		         
		         
		         if(f == 3){
		        	 
		        	 PdfPTable tableHobieInterna = new PdfPTable(1);
		        	 tableHobieInterna.setWidthPercentage(100);
		 		  	 
		 		  	 PdfPCell cell2ContieneImgH = new PdfPCell(Image.getInstance(String.format(hobieImg + id_hobbie+".png")));
		 		  
		 		  	 PdfPCell cell4ContieneImgH = new PdfPCell(new Paragraph (hobbie,textNormal));
		 		  	
		        	 
		 		
		        	 
		        	 c2F3.setImage(Image.getInstance(String.format(hobieImg + id_hobbie+".png")));
		        	 c2F4.setPhrase(new Paragraph (hobbie,textNormal2));
		        	 
		         }
		         
		         if(f == 4){
		        	 
		        	 PdfPTable tableHobieInterna = new PdfPTable(1);
		        	 tableHobieInterna.setWidthPercentage(100);
		 		  	 
		 		  	 PdfPCell cell2ContieneImgH = new PdfPCell(Image.getInstance(String.format(hobieImg + id_hobbie+".png")));
		 		  	
		 		  	 PdfPCell cell4ContieneImgH = new PdfPCell(new Paragraph (hobbie,textNormal));
		 		  	 
		 		  	
		        	 
		 		  
		        	 
		        	 c4F3.setImage(Image.getInstance(String.format(hobieImg + id_hobbie+".png")));
		        	 c4F4.setPhrase(new Paragraph (hobbie,textNormal2));
		        	 
		         }
		         
		         
		         if(f == 5){
		        	 
		        	 PdfPTable tableHobieInterna = new PdfPTable(1);
		        	 tableHobieInterna.setWidthPercentage(100);
		 		  	 
		 		  	 PdfPCell cell2ContieneImgH = new PdfPCell(Image.getInstance(String.format(hobieImg + id_hobbie+".png")));
		 		  	
		 		  	 PdfPCell cell4ContieneImgH = new PdfPCell(new Paragraph (hobbie,textNormal));
		 		  	
		        	 
		 		  
		        	 
		        	 c2F5.setImage(Image.getInstance(String.format(hobieImg + id_hobbie+".png")));
		        	 c2F6.setPhrase(new Paragraph (hobbie,textNormal2));
		        	 
		         }
		         
		         if(f == 6){
		        	 
		        	 PdfPTable tableHobieInterna = new PdfPTable(1);
		        	 tableHobieInterna.setWidthPercentage(100);
		 		  	 
		 		  	 PdfPCell cell2ContieneImgH = new PdfPCell(Image.getInstance(String.format(hobieImg + id_hobbie+".png")));
		 		  	
		 		  	 PdfPCell cell4ContieneImgH = new PdfPCell(new Paragraph (hobbie,textNormal));
		 		  	 
		        	 
		 		  	
		        	 
		        	 c4F5.setImage(Image.getInstance(String.format(hobieImg + id_hobbie+".png")));
		        	 c4F6.setPhrase(new Paragraph (hobbie,textNormal2));
		        	 
		         }
		         
		         f = f + 1;

		   
		    	
		    	}
		    
		    
		    
		    
	  		contieneImgCell2HobiesTable.addCell(c1F1);
	  		contieneImgCell2HobiesTable.addCell(c2F1);
	  		contieneImgCell2HobiesTable.addCell(c3F1);
	  		contieneImgCell2HobiesTable.addCell(c4F1);
	  		contieneImgCell2HobiesTable.addCell(c5F1);
	  		
	  		contieneImgCell2HobiesTable.addCell(c1F2);
	  		contieneImgCell2HobiesTable.addCell(c2F2);
	  		contieneImgCell2HobiesTable.addCell(c3F2);
	  		contieneImgCell2HobiesTable.addCell(c4F2);
	  		contieneImgCell2HobiesTable.addCell(c5F2);
	  		
	  		contieneImgCell2HobiesTable.addCell(c1F3);
	  		contieneImgCell2HobiesTable.addCell(c2F3);
	  		contieneImgCell2HobiesTable.addCell(c3F3);
	  		contieneImgCell2HobiesTable.addCell(c4F3);
	  		contieneImgCell2HobiesTable.addCell(c5F3);
	  		
	  		contieneImgCell2HobiesTable.addCell(c1F4);
	  		contieneImgCell2HobiesTable.addCell(c2F4);
	  		contieneImgCell2HobiesTable.addCell(c3F4);
	  		contieneImgCell2HobiesTable.addCell(c4F4);
	  		contieneImgCell2HobiesTable.addCell(c5F4);
	  		
	  		contieneImgCell2HobiesTable.addCell(c1F5);
	  		contieneImgCell2HobiesTable.addCell(c2F5);
	  		contieneImgCell2HobiesTable.addCell(c3F5);
	  		contieneImgCell2HobiesTable.addCell(c4F5);
	  		contieneImgCell2HobiesTable.addCell(c5F5);
	  		
	  		contieneImgCell2HobiesTable.addCell(c1F6);
	  		contieneImgCell2HobiesTable.addCell(c2F6);
	  		contieneImgCell2HobiesTable.addCell(c3F6);
	  		contieneImgCell2HobiesTable.addCell(c4F6);
	  		contieneImgCell2HobiesTable.addCell(c5F6);
	  		
	  		
	  		
		    
		  	 
		    cell2hobiesCotenedorTable.addElement(contieneImgCell2HobiesTable);
		  	 
		  	hobiesCotenedorTable.addCell(cell1hobiesCotenedorTable);
		  	hobiesCotenedorTable.addCell(cell2hobiesCotenedorTable);
		  	
		  	
		  	hobiesCotenedor.addElement(hobiesCotenedorTable);
		  	
		  	
		  	
		  	 
		  	 
		  
		  	
		  	PdfPTable softwareCotenedorTable = new PdfPTable(1);
		  	softwareCotenedorTable.setWidthPercentage(100);
		  	
		  	 PdfPCell cell1softwareCotenedorTable = new PdfPCell(new Paragraph ("Software",titulosRojos));
		  	 cell1softwareCotenedorTable.setHorizontalAlignment (Element.ALIGN_CENTER);
		  	 cell1softwareCotenedorTable.setBorder(Rectangle.NO_BORDER);
		  	 PdfPCell cell2softwareCotenedorTable = new PdfPCell();
		  	 cell2softwareCotenedorTable.setBorder(Rectangle.NO_BORDER);
		  	 
		  	 
		 
			  	PdfPTable internasoftCell2 = new PdfPTable(2);
			  	internasoftCell2.setWidthPercentage(100);
			  	
			  	float[] medidaCeldasSoftInterna = {40f, 20f};

	
			  	internasoftCell2.setWidths(medidaCeldasSoftInterna);
			  	
			  	
			
			  	String sqlSw = "SELECT \"software\".\"nombre\", \"software_aux\".\"dominio\" FROM \"software\" , \"software_aux\" WHERE \"software_aux\".\"id_software\" = \"software\".\"id_software\" AND \"software_aux\".\"id_usuario\" = :idUsuario ";
			     Query querySw = session.createSQLQuery(sqlSw).setParameter("idUsuario", idUsuario);
			     querySw.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			     List dataSw = querySw.list();
			     for (Object object : dataSw) {
			     	Map rowSw = (Map) object;
			     	
			     	this.dominioSoff = (BigDecimal) rowSw.get("dominio");
			     	
			     	String nombreSoft = (String) rowSw.get("nombre");
			     	 
			     	 String dominio = dominioSoff.toString();
			     	
			     	 PdfPCell cellTipoSoft4 = new PdfPCell (new Phrase(nombreSoft,textNormal));
			     	 cellTipoSoft4.setBorder(Rectangle.NO_BORDER);
		              PdfPCell cellTipoSoftDB4 = new PdfPCell (new Phrase(dominio+" % ",textNormal));
		             cellTipoSoftDB4.setBorder(Rectangle.NO_BORDER);
		              
		              internasoftCell2.addCell(cellTipoSoft4);
		              internasoftCell2.addCell(cellTipoSoftDB4);

		          	     
		     	}

			  	
			  	
			  	
			  	
		  	 	
			cell2softwareCotenedorTable.addElement(internasoftCell2);
		  	 
		  	softwareCotenedorTable.addCell(cell1softwareCotenedorTable);
		  	softwareCotenedorTable.addCell(cell2softwareCotenedorTable);
		  	
		  	
		  	
		  	
		  	
		  	
		  	 
		  	softwareCotenedor.addElement(softwareCotenedorTable);
		  	
		  	
	
			  
		  	 PdfPTable habilidadCotenedorTable = new PdfPTable(1);
		  	 habilidadCotenedorTable.setWidthPercentage(100);
		  	 
		  	 
		  	 PdfPCell cell1HabilidadCotenedorTable = new PdfPCell(new Paragraph ("Habilidades",titulosRojos));
		  	 cell1HabilidadCotenedorTable.setHorizontalAlignment (Element.ALIGN_CENTER);
		  	 cell1HabilidadCotenedorTable.setBorder(Rectangle.NO_BORDER);
		  	 habilidadCotenedorTable.addCell(cell1HabilidadCotenedorTable);
		  	 
		  	 
		  	String sqlH = "SELECT \"habilidad\".\"habilidad\",\"habilidad\".\"id_aux_habilidad\" FROM \"habilidad\" WHERE \"id_usuario\"=:idUsuario";
	        Query queryH = session.createSQLQuery(sqlH).setParameter("idUsuario", idUsuario);
	        queryH.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
	        List dataH = queryH.list();
	        for (Object object : dataH) {
	        	Map rowH = (Map) object;
	        	
	        	String habilidad = (String) rowH.get("habilidad");
	        	
	        	 PdfPCell cell2HabilidadCotenedorTable = new PdfPCell(new Phrase(habilidad,textNormal));
	        	 cell2HabilidadCotenedorTable.setBorder(Rectangle.NO_BORDER);
	        	 habilidadCotenedorTable.addCell(cell2HabilidadCotenedorTable);
	           	     
	        	}

		
	        softwareCotenedor.addElement(habilidadCotenedorTable);
		  	
		  	
		  	
		  	float[] medidaCeldas = {100f, 1f, 80f, 1f, 70f, 1f, 60f};

		
		  	informacionInternaTalentos.setWidths(medidaCeldas);
		  	
		  	

		  	
		  	
		  	informacionInternaTalentos.addCell(talentosCotenedor);
		  	informacionInternaTalentos.addCell(sepradorVertical);
		  	informacionInternaTalentos.addCell(personalidadCotenedor);
		  	informacionInternaTalentos.addCell(sepradorVertical);
		  	informacionInternaTalentos.addCell(hobiesCotenedor);
		  	informacionInternaTalentos.addCell(sepradorVertical);
		  	informacionInternaTalentos.addCell(softwareCotenedor);
		  	
		  	
		  
		  	dTalentos.addElement(informacionInternaTalentos);
		  	
		  	
		  	
		  	
		 
		  	
		  	
		  	
		  PdfPTable informacionInternaExtra = new PdfPTable(9);
		  informacionInternaExtra.setWidthPercentage(100);
		  
		  
		  	
		  PdfPCell salarioCotenedor = new PdfPCell();
		  salarioCotenedor.setBorder(Rectangle.NO_BORDER);
		  PdfPCell imagenverti = new PdfPCell(Image.getInstance(String.format(rutaBarraVerticalChica)));
		  imagenverti.setBorder(Rectangle.NO_BORDER);
		  imagenverti.setVerticalAlignment(Element.ALIGN_MIDDLE);
		  PdfPCell horarioCotenedor = new PdfPCell();
		  horarioCotenedor.setBorder(Rectangle.NO_BORDER);
		  PdfPCell viajarCotenedor = new PdfPCell();
		  viajarCotenedor.setBorder(Rectangle.NO_BORDER);
		  PdfPCell residenciaCotenedor = new PdfPCell();
		  residenciaCotenedor.setBorder(Rectangle.NO_BORDER);
		  PdfPCell areaCotenedor = new PdfPCell();
		  areaCotenedor.setBorder(Rectangle.NO_BORDER);
		  PdfPCell habilidadCotenedor = new PdfPCell();
		  habilidadCotenedor.setBorder(Rectangle.NO_BORDER);
		  
		  

		  
		  PdfPTable salarioCotenedorTable = new PdfPTable(1);
		  salarioCotenedorTable.setWidthPercentage(100);
		  	
		  	 PdfPCell cell1salarioCotenedorTable = new PdfPCell(new Paragraph ("Salario Deseado",titulosRojos));
		  	 cell1salarioCotenedorTable.setHorizontalAlignment (Element.ALIGN_CENTER);
		  	 cell1salarioCotenedorTable.setBorder(Rectangle.NO_BORDER);
		  	 PdfPCell cell2salarioCotenedorTable = new PdfPCell();
		  	 cell2salarioCotenedorTable.setFixedHeight(40f);
		  	 cell2salarioCotenedorTable.setBorder(Rectangle.NO_BORDER);
		  	 	
		  	 
		  	 	PdfPTable internaCell2SalarioTable = new PdfPTable(2);
		  	 	internaCell2SalarioTable.setWidthPercentage(100);
		  	 	
		  	 	PdfPCell cell1internaCell2SalarioTable = new PdfPCell();
		  	 	cell1internaCell2SalarioTable.setBorder(Rectangle.NO_BORDER);
		  	 	cell1internaCell2SalarioTable.setImage(imagenSalario);
		  	 	internaCell2SalarioTable.addCell(cell1internaCell2SalarioTable);
		  	 	
		  	 
		  	 	
		  	 	String sqlSal = "SELECT \"salario_deseado\".\"salario_deseado\"  FROM \"salario_deseado\" WHERE  \"salario_deseado\".\"id_usuario\"=:idUsuario";
			     Query querySal = session.createSQLQuery(sqlSal).setParameter("idUsuario", idUsuario);
			     querySal.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			     List dataSal = querySal.list();
			     for (Object object : dataSal) {
			     	Map rowSal = (Map) object;

			        this.sueldoDeseado= (BigDecimal) rowSal.get("salario_deseado");
			        
			        PdfPCell cell2internaCell2SalarioTable = new PdfPCell(new Paragraph ("Más de: $"+sueldoDeseado+" Mensuales",textNormal));
			        cell2internaCell2SalarioTable.setVerticalAlignment(Element.ALIGN_MIDDLE);
			        cell2internaCell2SalarioTable.setHorizontalAlignment(Element.ALIGN_CENTER);
			        cell2internaCell2SalarioTable.setBorder(Rectangle.NO_BORDER);
			        internaCell2SalarioTable.addCell(cell2internaCell2SalarioTable);
			            
		     	}

		  	 
			  	
			  	
			  
			  	cell2salarioCotenedorTable.addElement(internaCell2SalarioTable);
		  	 
		  	 
		  
		  	salarioCotenedorTable.addCell(cell1salarioCotenedorTable);
		  	salarioCotenedorTable.addCell(cell2salarioCotenedorTable);
		  	
		  	salarioCotenedor.addElement(salarioCotenedorTable);
		  
		  
		
		  	
		  	 PdfPTable horarioCotenedorTable = new PdfPTable(1);
		  	 horarioCotenedorTable.setWidthPercentage(100);
			  	
			  	 PdfPCell cell1horarioCotenedorTable = new PdfPCell(new Paragraph ("Horario Preferido",titulosRojos));
			  	 cell1horarioCotenedorTable.setHorizontalAlignment (Element.ALIGN_CENTER);
			  	 cell1horarioCotenedorTable.setBorder(Rectangle.NO_BORDER);
			  	 PdfPCell cell2horarioCotenedorTable = new PdfPCell();
			  	 cell2horarioCotenedorTable.setBorder(Rectangle.NO_BORDER);
			  	 cell2horarioCotenedorTable.setFixedHeight(40f);
			  	 
			  	 
			  
			  	 
			  	 	PdfPTable internaCell2HorarioTable = new PdfPTable(2);
			  	 	internaCell2HorarioTable.setWidthPercentage(100);
			  	 	
			  	 	PdfPCell cell1internaCell2HorarioTable = new PdfPCell();
			  	 	cell1internaCell2HorarioTable.setImage(imagenHorario);
			  	 	cell1internaCell2HorarioTable.setBorder(Rectangle.NO_BORDER);
			  	 	internaCell2HorarioTable.addCell(cell1internaCell2HorarioTable);
			  	 	
			  	 	
			  	 	
			  	 	String sqlHor = "SELECT \"horario_preferido\".\"horario_preferido\"  FROM \"horario_preferido\" WHERE  \"horario_preferido\".\"id_usuario\"=:idUsuario";
				     Query queryHor = session.createSQLQuery(sqlHor).setParameter("idUsuario", idUsuario);
				     queryHor.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				     List dataHor = queryHor.list();
				     for (Object object : dataHor) {
				     	Map rowHor = (Map) object;

				          this.horarioDeseado=(String) rowHor.get("horario_preferido");
				          PdfPCell cell2internaCell2HorarioTable = new PdfPCell(new Paragraph (horarioDeseado,textNormal));
				          cell2internaCell2HorarioTable.setVerticalAlignment(Element.ALIGN_MIDDLE);
				          cell2internaCell2HorarioTable.setHorizontalAlignment(Element.ALIGN_CENTER);
				          cell2internaCell2HorarioTable.setBorder(Rectangle.NO_BORDER);
				          internaCell2HorarioTable.addCell(cell2internaCell2HorarioTable);
				          
			     	}
				  	
				  	
				  
				     cell2horarioCotenedorTable.addElement(internaCell2HorarioTable);
			  	 
			  	 
			
			horarioCotenedorTable.addCell(cell1horarioCotenedorTable);
			horarioCotenedorTable.addCell(cell2horarioCotenedorTable);
			
			horarioCotenedor.addElement(horarioCotenedorTable);
			  	 
		  
		  
			
			 PdfPTable viajarCotenedorTable = new PdfPTable(1);
			 viajarCotenedorTable.setWidthPercentage(100);
			  	
			  	 PdfPCell cell1ViajarCotenedorTable = new PdfPCell(new Paragraph ("Disposición de",titulosRojos));
			  	 cell1ViajarCotenedorTable.setHorizontalAlignment (Element.ALIGN_CENTER);
			  	 cell1ViajarCotenedorTable.setBorder(Rectangle.NO_BORDER);
			  	 PdfPCell cell2ViajarCotenedorTable = new PdfPCell();
			  	 cell2ViajarCotenedorTable.setFixedHeight(40f);
			  	 cell2ViajarCotenedorTable.setBorder(Rectangle.NO_BORDER);
			  	 cell1ViajarCotenedorTable.setColspan(2);
			  	 
			  	 
			  	
			  	 
			  	 	PdfPTable internaCell2ViajarTable = new PdfPTable(2);
			  	 	internaCell2ViajarTable.setWidthPercentage(100);
			  	 	
			  	 	PdfPCell cell1internaCell2ViajarTable = new PdfPCell();
			  	 	cell1internaCell2ViajarTable.setImage(imagenViajar);
			  	 	cell1internaCell2ViajarTable.setBorder(Rectangle.NO_BORDER);
			  	 	internaCell2ViajarTable.addCell(cell1internaCell2ViajarTable);
			  	 	
			  	 	
			  	 	
			  	  String sqlDis = "SELECT \"disposicion\".\"viajar\",\"disposicion\".\"mudarse\"  FROM \"disposicion\" WHERE  \"disposicion\".\"id_usuario\"=:idUsuario";
				     Query queryDis = session.createSQLQuery(sqlDis).setParameter("idUsuario", idUsuario);
				     queryDis.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				     List dataDis = queryDis.list();
				     for (Object object : dataDis) {
				     	Map rowDis = (Map) object;

				         this.viaje=(String) rowDis.get("viajar");
				         this.mudanza=(String) rowDis.get("mudarse");
				         
				         PdfPCell cell2internaCell2ViajarTable = new PdfPCell (new Phrase("Viajar "+viaje,textNormal));
				         cell2internaCell2ViajarTable.setVerticalAlignment(Element.ALIGN_MIDDLE);
				         cell2internaCell2ViajarTable.setHorizontalAlignment(Element.ALIGN_CENTER);
				         cell2internaCell2ViajarTable.setBorder(Rectangle.NO_BORDER);
				         internaCell2ViajarTable.addCell(cell2internaCell2ViajarTable);
				        
			    	}

				  	
				  	
				  	
				     cell2ViajarCotenedorTable.addElement(internaCell2ViajarTable); 	 
			  	 
			  	 
			  	 
			  	 
			  	 

			  viajarCotenedorTable.addCell(cell1ViajarCotenedorTable);
			  viajarCotenedorTable.addCell(cell2ViajarCotenedorTable);
			
			  viajarCotenedor.addElement(viajarCotenedorTable);
			  
			  
			  
		  
		 
			  
			  PdfPTable residenciaCotenedorTable = new PdfPTable(1);
			  residenciaCotenedorTable.setWidthPercentage(100);
				  	
				  	 PdfPCell cell1ResidenciaCotenedorTable = new PdfPCell(new Paragraph (" ",titulosRojos));
				  	 cell1ResidenciaCotenedorTable.setBorder(Rectangle.NO_BORDER);
				  	 PdfPCell cell2ResidenciaCotenedorTable = new PdfPCell();
				  	 cell2ResidenciaCotenedorTable.setFixedHeight(40f);
				  	 cell2ResidenciaCotenedorTable.setBorder(Rectangle.NO_BORDER);
				  	 
				  	 
			
				  	 
				  	 	PdfPTable internaCell2MudarTable = new PdfPTable(2);
				  	 	internaCell2MudarTable.setWidthPercentage(100);
				  	 	
				  	 	PdfPCell cell1internaCell2MudarTable = new PdfPCell();
				  	 	cell1internaCell2MudarTable.setImage(imagenResidencia);
				  	 	cell1internaCell2MudarTable.setBorder(Rectangle.NO_BORDER);
				  	 	internaCell2MudarTable.addCell(cell1internaCell2MudarTable);
				  	 	
				  	 
					         
				         PdfPCell cell2internaCell2MudarTable = new PdfPCell (new Phrase("Cambio de Residencia "+mudanza,textNormal));
				         cell2internaCell2MudarTable.setVerticalAlignment(Element.ALIGN_MIDDLE);
				         cell2internaCell2MudarTable.setHorizontalAlignment(Element.ALIGN_CENTER);
				         cell2internaCell2MudarTable.setBorder(Rectangle.NO_BORDER);
				         internaCell2MudarTable.addCell(cell2internaCell2MudarTable);
					 

					  	
					  	
					  	
				         cell2ResidenciaCotenedorTable.addElement(internaCell2MudarTable);
				  	 
				  	 
			  
	  	
	  	residenciaCotenedorTable.addCell(cell1ResidenciaCotenedorTable);
	  	residenciaCotenedorTable.addCell(cell2ResidenciaCotenedorTable);
		
	  	residenciaCotenedor.addElement(residenciaCotenedorTable);
		  
		  
		  
		  

	  	
	  	
	  	 PdfPTable areaCotenedorTable = new PdfPTable(1);
	  	 areaCotenedorTable.setWidthPercentage(100);
			  	
			  	 PdfPCell cell1AreaCotenedorTable = new PdfPCell(new Paragraph ("Área de Interés",titulosRojos));
			  	 cell1AreaCotenedorTable.setHorizontalAlignment (Element.ALIGN_CENTER);
			  	 cell1AreaCotenedorTable.setBorder(Rectangle.NO_BORDER);
			  	 PdfPCell cell2AreaCotenedorTable = new PdfPCell(new Phrase(areaDeInteres,textNormal));
			  	 cell2AreaCotenedorTable.setBorder(Rectangle.NO_BORDER);
			  	 cell2AreaCotenedorTable.setFixedHeight(40f);
			  	 cell2AreaCotenedorTable.setVerticalAlignment(Element.ALIGN_MIDDLE);
			  	 cell2AreaCotenedorTable.setHorizontalAlignment(Element.ALIGN_CENTER);
	  	
	  
	  	areaCotenedorTable.addCell(cell1AreaCotenedorTable);
	  	areaCotenedorTable.addCell(cell2AreaCotenedorTable);
	
	  	areaCotenedor.addElement(areaCotenedorTable);
	  	
	  	
	  	
	  	
	  	
	  	
	  	
		  
		
		  
	  	 PdfPTable habilidadCotenedorTable2 = new PdfPTable(1);
	  	 habilidadCotenedorTable2.setWidthPercentage(100);
	  	 
	  	 
	  	 PdfPCell cell1HabilidadCotenedorTable2 = new PdfPCell(new Paragraph ("Habilidades",titulosRojos));
	  	 cell1HabilidadCotenedorTable2.setHorizontalAlignment (Element.ALIGN_CENTER);
	  	 cell1HabilidadCotenedorTable.setBorder(Rectangle.NO_BORDER);
	  	 habilidadCotenedorTable2.addCell(cell1HabilidadCotenedorTable2);
	  	 
	  	 
	

	
	  	habilidadCotenedor.addElement(habilidadCotenedorTable2);
		  
		
	  	
	  	
	  	float[] medidaCeldas46 = {40f, 3f, 40f, 3f, 40f, 3f, 40f, 3f, 40f};

	  
	  	informacionInternaExtra.setWidths(medidaCeldas46);
		  
		  informacionInternaExtra.addCell(salarioCotenedor);
		  informacionInternaExtra.addCell(imagenverti);
		  informacionInternaExtra.addCell(horarioCotenedor);
		  informacionInternaExtra.addCell(imagenverti);
		  informacionInternaExtra.addCell(viajarCotenedor);
		  informacionInternaExtra.addCell(imagenverti);
		  informacionInternaExtra.addCell(residenciaCotenedor);
		  informacionInternaExtra.addCell(imagenverti);
		  informacionInternaExtra.addCell(areaCotenedor);
		  
		  
		 dExtra.addElement(informacionInternaExtra);
		 
		 
		 
		 PdfPTable contendorFooter = new PdfPTable(2);
		 
		 contendorFooter.setWidthPercentage(100);
		 
		 PdfPCell cell1footerImg = new PdfPCell(Image.getInstance(String.format(rutaLogoNuevo)));
		 cell1footerImg.setBorder(Rectangle.NO_BORDER);
		 cell1footerImg.setHorizontalAlignment(Element.ALIGN_RIGHT);
		 PdfPCell cell1footer = new PdfPCell(new Paragraph ("Esta infografía curricular fue realizada desde www.bolsadetrabajoiusacell.com.mx",textNormal));
		 cell1footer.setBorder(Rectangle.NO_BORDER);
		 
		 contendorFooter.addCell(cell1footerImg);
		 contendorFooter.addCell(cell1footer);
		 
		 
		 float[] medidaCeldas47 = {190f, 305f};

		  	
		 contendorFooter.setWidths(medidaCeldas47);
		 
		 dExtra2.addElement(contendorFooter);
		 
		 
		
		 
		 PdfPTable tablaInfo = new PdfPTable(1);
		 tablaInfo.setWidthPercentage(100);
			  	
			  	 PdfPCell cell1TablaInfo = new PdfPCell(new Paragraph ("Trayectoria Laboral y de Educación",titulosRojos));
			  	 cell1TablaInfo.setFixedHeight(15f);
			  	cell1TablaInfo.setVerticalAlignment(Element.ALIGN_MIDDLE);
			  	 cell1TablaInfo.setBorder(Rectangle.NO_BORDER);
			  	 Image imageInfografa = Image.getInstance(String.format(rutaInfografia));
			  	
			  	 PdfPCell cell2TablaInfo = new PdfPCell();
			  	cell2TablaInfo.addElement(imageInfografa);
			  	 cell2TablaInfo.setBorder(Rectangle.NO_BORDER);
			  	 PdfPCell cell3TablaInfo = new PdfPCell(new Phrase("",titulosRojos));
			  	 cell3TablaInfo.setBorder(Rectangle.NO_BORDER);
		  	
			  	tablaInfo.addCell(cell1TablaInfo);
			  	tablaInfo.addCell(cell2TablaInfo);
			
			  	
		
	     dInfografia.addElement(tablaInfo);
		  	
	  	
	  	 
		  	tablaSeccionesPrin.setWidthPercentage(100);
		  	
		  	
		  	 
		  	tablaSeccionesPrin.addCell(cabecera);
		  	
		  	tablaSeccionesPrin.addCell(dPesonales);
		  	tablaSeccionesPrin.addCell(separador2);
		  	tablaSeccionesPrin.addCell(dInfografia);
		  	tablaSeccionesPrin.addCell(separador3);
		  	tablaSeccionesPrin.addCell(dTalentos);
		  	tablaSeccionesPrin.addCell(separador4);
		  	tablaSeccionesPrin.addCell(dExtra);
		  	tablaSeccionesPrin.addCell(dExtra2);
	  	 
	  	 
	  	
	  	cell1.addElement(tablaSeccionesPrin);	 	  
	 	  
	 
	 	  
	 	  tablaContenedor.addCell(cell1);
	 	  
	 	  document.add(tablaContenedor);
	 	  
	 	  document.close(); 
	 	  
	 	
	 	   
		} catch (FileNotFoundException e) {
			
			
			
			
			e.printStackTrace();
		} catch (DocumentException e) {
			
			
			
		
			e.printStackTrace();
		} catch (MalformedURLException e) {
			
			
			
			
			e.printStackTrace();
		} catch (IOException e) {
			
			
			
			
			e.printStackTrace();
		}
	
   	}catch(Exception  e){
	     e.printStackTrace();
   		
   		
	   }
   	   System.out.println(rutaPDF);
	    return rutaPDF;
	   
   }

   
   @Override
   public void setServletRequest(HttpServletRequest servletRequest) {
       this.servletRequest = servletRequest;

   }

public String getNombreArchivo() {
	return nombreArchivo;
}


public String getRutaFile() {
	return rutaFile;
}


public String getRutaFinal() {
	return rutaFinal;
}





public String getRutaSeparador() {
	return rutaSeparador;
}


public String getRutaFotoUsu() {
	return rutaFotoUsu;
}


public String getRutaCasa() {
	return rutaCasa;
}


public String getRutaBandera() {
	return rutaBandera;
}


public String getRutaSeparadorHorizontal() {
	return rutaSeparadorHorizontal;
}


public BigDecimal getDominioSoff() {
	return dominioSoff;
}


public void setDominioSoff(BigDecimal dominioSoff) {
	this.dominioSoff = dominioSoff;
}


public String getRutaSalario() {
	return rutaSalario;
}


public String getRutaHorario() {
	return rutaHorario;
}


public String getRutaResidencia() {
	return rutaResidencia;
}


public String getRutaViajar() {
	return rutaViajar;
}


public String getHobieImg() {
	return hobieImg;
}


public List<BigDecimal> getListaIdHobie() {
	return listaIdHobie;
}


public void setListaIdHobie(List<BigDecimal> listaIdHobie) {
	this.listaIdHobie = listaIdHobie;
}


public List<String> getListaHomHobie() {
	return listaHomHobie;
}


public void setListaHomHobie(List<String> listaHomHobie) {
	this.listaHomHobie = listaHomHobie;
}


public String getRutaInfografia() {
	return rutaInfografia;
}


public String getRutaDonaTalentos() {
	return rutaDonaTalentos;
}

public String getRutaFolder() {
	return rutaFolder;
}

public String getRutaBarra() {
	return rutaBarra;
}

public String getRutaLogoNuevo() {
	return rutaLogoNuevo;
}

public String getRutaBarraVerticalChica() {
	return rutaBarraVerticalChica;
}

public String escapeChars(String cadena)throws CaracterNoValidoException{

   	String escapedString="";
  
   	if(cadena.matches("[0-9a-zA-Z._@-]*")){
   		
   		String reg = "[=;*|()%#!&?]";
   		   
       	escapedString= cadena.replaceAll(reg,"");
   		
   	}else{
   		
   		throw new CaracterNoValidoException();
   		
   	}
   	
   	
   	return escapedString;
   }

public String escapeSpaces(String cadena){

   	String escapedString="";

   		String reg = "\\s";
   		   
       	escapedString= cadena.replaceAll(reg,"");
   		

   	
   	
   	return escapedString;
   }

public static void deleteFolder(File folder) {
    File[] files = folder.listFiles();
    if(files!=null) { //some JVMs return null for empty dirs
        for(File f: files) {
            if(f.isDirectory()) {
                deleteFolder(f);
            } else {
                f.delete();
            }
        }
    }
    folder.delete();
}













































	
	
}
