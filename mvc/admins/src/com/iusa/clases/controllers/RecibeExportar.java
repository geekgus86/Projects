package com.iusa.clases.controllers;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;

import com.opensymphony.xwork2.ActionSupport;

import com.iusa.clases.models.*;

/**		IMPORTANDO LAS CLASES PARA HACER EL ARCHIVO DE EXCEL
 ***********************************************************************/

import org.apache.commons.io.FileUtils;
import org.apache.poi.hssf.usermodel.HSSFCellStyle;
import org.apache.poi.hssf.usermodel.HSSFFont;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;  		//CREAR LIBRO
import org.apache.poi.hssf.usermodel.HSSFSheet; 			//CREAR HOJA
import org.apache.poi.hssf.usermodel.HSSFRow; 	   			//CREAR FILAS
import org.apache.poi.hssf.usermodel.HSSFCell;      		//CREAR CELDAS
import org.apache.poi.hssf.usermodel.HSSFRichTextString;    //CREAR TEXTO
import org.apache.poi.ss.usermodel.RichTextString;
import org.apache.struts2.ServletActionContext;
import org.apache.struts2.interceptor.ServletRequestAware;

import java.io.DataOutputStream;
import java.io.File;         //PARA CREAR EL ARCHIVO
import java.io.FileOutputStream;
import java.io.IOException;  //PARA LA EXCEPCION
import java.math.BigDecimal;
import java.net.URL;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.GregorianCalendar;
import java.util.HashMap;
import java.util.HashSet;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

public class RecibeExportar extends ActionSupport implements ServletRequestAware {
	
	 private HttpServletRequest servletRequest;

	private String tipoExportacion;
	private int nuevaCla;
	
	
	private String NombreArchivo;
	
	
	Session session;
	
	public RecibeExportar(){
		session=HibernateUtil.getSessionFactory().getCurrentSession();
	}
	
	
	private LinkedHashMap<String, Object> jsonDataCAE = new LinkedHashMap<String, Object>();
	private Set<Map<String, Object>> items = new HashSet<Map<String, Object>>();
	
	
	private BigDecimal idAdmin;
	private String nombreAdmin;
	private String directorioAnio;
	private String directorioMes;
	private String directorioNombreAdmin;
	
	private String rutaF;
	private String routaF;
	
	
	private String folio[];
	private ArrayList<String> listafolios2;
	
	private String fol;
	private List<String> listaFolios;
	
	private String nombreVacante;
	private List<String> listaNombreVacante;
	
	private String subidoPor;
	private List<String> listaSubidoPor;
	
	
	private String tipoVacante;
	private List<String> listaTipoVacante;
	
	private BigDecimal destacado;
	private List<BigDecimal> listaDestacado;
	
	private List<String> listaFechaP;
	private List<String> listaFechaV;
	
	public String giveMe() {
		
		HSSFWorkbook libro = new HSSFWorkbook();
		
		
		Calendar fechaInstanciaF = new GregorianCalendar();
		String mesF = Integer.toString(fechaInstanciaF.get(Calendar.MONTH)+1);  
		String annioF = Integer.toString(fechaInstanciaF.get(Calendar.YEAR)); 
		
		directorioAnio =   annioF;
		directorioMes = mesF;
		
		
		String user;
		HttpServletRequest request = ServletActionContext.getRequest();
	    HttpSession sesion = request.getSession();
	    user=escapeChars((String) sesion.getAttribute("usuario"));
	    
	    Transaction trans = session.beginTransaction();
		
		try{
		
		if(user!=null){
			
			
			
				String sql_admin ="SELECT \"admins\".\"nombre\", \"admins\".\"id_admin\"  FROM \"admins\"  WHERE \"admins\".\"email\" = :user  ";
				Query A = session.createSQLQuery(sql_admin);
				A.setParameter("user", user);
				A.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List dA = A.list();
				for (Object object : dA) {
			         Map row = (Map) object;
			         this.nombreAdmin = (String) row.get("nombre");
			         this.idAdmin = (BigDecimal) row.get("id_admin");
			     }
			
			
		}
		
		this.directorioNombreAdmin = nombreAdmin + mesF +annioF;
		
		
		
		
		
		
		
		
		
		
		
		if(this.nuevaCla == 1){  

				
				HSSFSheet hoja = libro.createSheet("Vacantes Generales");
				
				HSSFRow filaTit  = hoja.createRow(0);
				
				HSSFCell celdaTitulo = filaTit.createCell(1);
				
				HSSFRichTextString textoTitulo = new HSSFRichTextString("Vacantes Generales");
				
				celdaTitulo.setCellValue(textoTitulo);
				
				
				HSSFRow filaEncaTabla  = hoja.createRow(1);
				
				HSSFCell celdaEncabezado1 = filaEncaTabla.createCell(1);
				HSSFCell celdaEncabezado2 = filaEncaTabla.createCell(2);
				HSSFCell celdaEncabezado3 = filaEncaTabla.createCell(3);
				HSSFCell celdaEncabezado4 = filaEncaTabla.createCell(4);
				HSSFCell celdaEncabezado5 = filaEncaTabla.createCell(5);
				HSSFCell celdaEncabezado6 = filaEncaTabla.createCell(6);
				HSSFCell celdaEncabezado7 = filaEncaTabla.createCell(7);
				
				
				
				
				HSSFRichTextString textoEncabezado1 = new HSSFRichTextString("Folio");
				celdaEncabezado1.setCellValue(textoEncabezado1);
				
				
				HSSFRichTextString textoEncabezado2 = new HSSFRichTextString("Nombre Vacante");
				celdaEncabezado2.setCellValue(textoEncabezado2);
				
				
				HSSFRichTextString textoEncabezado3 = new HSSFRichTextString("Fecha Publicacion");
				celdaEncabezado3.setCellValue(textoEncabezado3);
				
				
				HSSFRichTextString textoEncabezado4 = new HSSFRichTextString("Fecha Vigencia");
				celdaEncabezado4.setCellValue(textoEncabezado4);
				
				
				HSSFRichTextString textoEncabezado5 = new HSSFRichTextString("Subido Por");
				celdaEncabezado5.setCellValue(textoEncabezado5);
				
				
				HSSFRichTextString textoEncabezado6 = new HSSFRichTextString("Tipo de Vacante");
				celdaEncabezado6.setCellValue(textoEncabezado6);
				
				
				HSSFRichTextString textoEncabezado7 = new HSSFRichTextString("Destacada");
				celdaEncabezado7.setCellValue(textoEncabezado7);
				
				
				int j = 0, k = 0, l = 0, m = 0, n = 0, o = 0, p = 0;
				
				int numeroFilas = 0; 
				int numeroCeldas = 7; 
				
				
				listafolios2 = new ArrayList<String>();
				
				
				listaFolios=new ArrayList<String>();
				
				listaNombreVacante=new ArrayList<String>();
				
				listaSubidoPor=new ArrayList<String>();
				
				listaTipoVacante=new ArrayList<String>();
				
				listaFechaP=new ArrayList<String>();
				
				listaFechaV=new ArrayList<String>();
				
				listaDestacado = new ArrayList<BigDecimal>();
				
				
				
				String sql_vac_no_filtro = "SELECT \"vacante\".\"id_vacante\", \"vacante\".\"nombre_vacante\", \"vacante\".\"folio\", \"vacante\".\"fecha_publicacion\", \"vacante\".\"fecha_vigencia\", \"vacante\".\"texto_introductorio\", \"vacante\".\"escolaridad\", \"vacante\".\"sueldo_vacante\", \"vacante\".\"anios_experiencia\", \"vacante\".\"conocimientos\", \"vacante\".\"talentos\", \"vacante\".\"ubicacion\", \"vacante\".\"estado_vacante\", \"vacante\".\"destacado\", \"vacante\".\"area_experiencia\", \"vacante\".\"principales_funciones\", \"vacante\".\"horario\", \"vacante\".\"edad\", \"vacante\".\"observaciones\", \"admins\".\"nombre\", \"vacante_tipo\".\"tipo_vacante\", \"vacante_tipo\".\"ubicacion\" AS VAC_UBICACION FROM \"vacante\" , \"admins\" , \"vacante_tipo\" WHERE  \"vacante\".\"subido_por\" = \"admins\".\"id_admin\" AND \"vacante\".\"tipo_vacante\" = \"vacante_tipo\".\"id_tipo\"";
				
				Query query_vac_no_filtro = session.createSQLQuery(sql_vac_no_filtro);
				
				query_vac_no_filtro.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List list_vac_no_filtro = query_vac_no_filtro.list();
				
				for (Object object : list_vac_no_filtro) {
			         Map row = (Map) object;
			         
			         
			         fol=(String)row.get("folio");
			        

			         nombreVacante = (String) row.get("nombre_vacante");
			         
			         String fechaxs = new SimpleDateFormat("dd/MM/yyyy").format(row.get("fecha_publicacion"));
			        
			         String fechaxs2 = new SimpleDateFormat("dd/MM/yyyy").format(row.get("fecha_vigencia"));
			       
			         destacado = (BigDecimal) row.get("destacado");
			         
			         subidoPor = (String) row.get("nombre");
			         
			         tipoVacante = (String) row.get("tipo_vacante");
			         
			         
			         
			       
			      
			         
			         
			     
			         	listaFolios.add(fol);
			         
			         
			         	listaNombreVacante.add(nombreVacante);
						
						listaSubidoPor.add(subidoPor);
						
						listaTipoVacante.add(tipoVacante);
						
						listaFechaP.add(fechaxs);
						
						listaFechaV.add(fechaxs2);
						
						listaDestacado.add(destacado);
			     	
			         
			         }
				
				
				
				numeroFilas = listaFolios.size();
				
				int b=0;
				for (j=2;j<=numeroFilas;j++){
					
					
					HSSFRow filaContenido  = hoja.createRow(j);
					
					HSSFCell celdaContenido1 = filaContenido.createCell(1);
					
					celdaContenido1.setCellValue(listaFolios.get( b ));
					
					
					
					HSSFCell celdaContenido2 = filaContenido.createCell(2);
					
					celdaContenido2.setCellValue(listaNombreVacante.get( b ));
					
					
					HSSFCell celdaContenido3 = filaContenido.createCell(3);
					
					celdaContenido3.setCellValue(listaFechaP.get( b ));
					
					
					HSSFCell celdaContenido4 = filaContenido.createCell(4);
					
					celdaContenido4.setCellValue(listaFechaV.get( b ));
					
					
					HSSFCell celdaContenido5 = filaContenido.createCell(5);
					
					celdaContenido5.setCellValue(listaSubidoPor.get( b ));
					
					
					HSSFCell celdaContenido6 = filaContenido.createCell(6);
					
					celdaContenido6.setCellValue(listaTipoVacante.get( b ));
					
					
					HSSFCell celdaContenido7 = filaContenido.createCell(7);
					
					celdaContenido7.setCellValue( listaDestacado.get( b ).doubleValue());
					
					
					
					b = b + 1;
					
					
				}
				
				
				
				
				try{
					
					
					
					rutaF = servletRequest.getSession().getServletContext().getRealPath("/");
			        routaF=rutaF+"/reportes";
					File folder = new File( routaF+"/"+directorioNombreAdmin);
					if (!folder.exists()) { 
						folder.mkdir();
					}
					
					
					
					
					
					String ruta = servletRequest.getSession().getServletContext().getRealPath("/");
					
			        String routa=rutaF+"/reportes/"+directorioNombreAdmin; 
			        
			        int seleccionado = (int) Math.round((Math.random()*1000)); 
					
					String ran = String.valueOf(seleccionado);
				
					String sSubNombreAdmin = nombreAdmin.substring(0,1) + ran;
					
					this.NombreArchivo = sSubNombreAdmin;
			        
			        String DBruta="reportes/"+directorioNombreAdmin+"/"+NombreArchivo+".xls" ;
			        
			        
			        DataOutputStream archivo = new DataOutputStream(new FileOutputStream(routa+"/"+NombreArchivo+".xls"));
			        
			        
			        
			        libro.write(archivo);
			       
			        archivo.close();
			        
			        
			        
			       
			        	FilesExcel Etsel = new FilesExcel();
			        	Etsel.setRutaFileExcel(DBruta);
			        	Etsel.setIdSubidoPor(idAdmin);
			       
			        
			       
			        HashMap<String, Object> itemMap = new HashMap<String, Object>();
		        	
		        	String mensaje1 = "Se ha Creado el Archivo Satisfactoriamente";
		        	
		        	String mensaje2 = DBruta;
		        	
		        	itemMap.put("error1", mensaje1);
		        	itemMap.put("ruta_nueva", mensaje2);
		        	items.add(itemMap);
		        	
		        	jsonDataCAE.put("Mensajes", items);
					
				}
				
				catch (Exception e){
					
					HashMap<String, Object> itemMap = new HashMap<String, Object>();
					
					String mensaje1 = "No se ha creado el archivo Satisfactoriamente";
					
					e.printStackTrace();
					
		        	itemMap.put("error1", mensaje1);
		        	items.add(itemMap);
		        	
		        	jsonDataCAE.put("Mensajes", items);
					
				}
			
			
		}else if(this.nuevaCla == 2){
			
			
			HSSFSheet hoja = libro.createSheet("Vacantes Generales");
			
			HSSFRow filaTit  = hoja.createRow(0);
			
			HSSFCell celdaTitulo = filaTit.createCell(1);
			
			HSSFRichTextString textoTitulo = new HSSFRichTextString("Vacantes Generales");
			
			celdaTitulo.setCellValue(textoTitulo);
			
			
			HSSFRow filaEncaTabla  = hoja.createRow(1);
			
			HSSFCell celdaEncabezado1 = filaEncaTabla.createCell(1);
			HSSFCell celdaEncabezado2 = filaEncaTabla.createCell(2);
			HSSFCell celdaEncabezado3 = filaEncaTabla.createCell(3);
			HSSFCell celdaEncabezado4 = filaEncaTabla.createCell(4);
			HSSFCell celdaEncabezado5 = filaEncaTabla.createCell(5);
			HSSFCell celdaEncabezado6 = filaEncaTabla.createCell(6);
			HSSFCell celdaEncabezado7 = filaEncaTabla.createCell(7);
			
			
			HSSFRichTextString textoEncabezado1 = new HSSFRichTextString("Folio");
			celdaEncabezado1.setCellValue(textoEncabezado1);
			
			
			HSSFRichTextString textoEncabezado2 = new HSSFRichTextString("Nombre Vacante");
			celdaEncabezado2.setCellValue(textoEncabezado2);
			
		
			HSSFRichTextString textoEncabezado3 = new HSSFRichTextString("Fecha Publicacion");
			celdaEncabezado3.setCellValue(textoEncabezado3);
			
			
			HSSFRichTextString textoEncabezado4 = new HSSFRichTextString("Fecha Vigencia");
			celdaEncabezado4.setCellValue(textoEncabezado4);
			
			
			HSSFRichTextString textoEncabezado5 = new HSSFRichTextString("Subido Por");
			celdaEncabezado5.setCellValue(textoEncabezado5);
			
			
			HSSFRichTextString textoEncabezado6 = new HSSFRichTextString("Tipo de Vacante");
			celdaEncabezado6.setCellValue(textoEncabezado6);
			
			
			HSSFRichTextString textoEncabezado7 = new HSSFRichTextString("Destacada");
			celdaEncabezado7.setCellValue(textoEncabezado7);
			
			
			int j = 0, k = 0, l = 0, m = 0, n = 0, o = 0, p = 0;
			
			int numeroFilas = 0; 
			int numeroCeldas = 7; 
			
			
			listafolios2 = new ArrayList<String>();
			
			
			listaFolios=new ArrayList<String>();
			
			listaNombreVacante=new ArrayList<String>();
			
			listaSubidoPor=new ArrayList<String>();
			
			listaTipoVacante=new ArrayList<String>();
			
			listaFechaP=new ArrayList<String>();
			
			listaFechaV=new ArrayList<String>();
			
			listaDestacado = new ArrayList<BigDecimal>();
			
			
			
			String sql_vac_no_filtro = "SELECT \"vacante\".\"id_vacante\", \"vacante\".\"nombre_vacante\", \"vacante\".\"folio\", \"vacante\".\"fecha_publicacion\", \"vacante\".\"fecha_vigencia\", \"vacante\".\"texto_introductorio\", \"vacante\".\"escolaridad\", \"vacante\".\"sueldo_vacante\", \"vacante\".\"anios_experiencia\", \"vacante\".\"conocimientos\", \"vacante\".\"talentos\", \"vacante\".\"ubicacion\", \"vacante\".\"estado_vacante\", \"vacante\".\"destacado\", \"vacante\".\"area_experiencia\", \"vacante\".\"principales_funciones\", \"vacante\".\"horario\", \"vacante\".\"edad\", \"vacante\".\"observaciones\", \"admins\".\"nombre\", \"vacante_tipo\".\"tipo_vacante\", \"vacante_tipo\".\"ubicacion\" AS VAC_UBICACION FROM \"vacante\" , \"admins\" , \"vacante_tipo\" WHERE  \"vacante\".\"subido_por\" = \"admins\".\"id_admin\" AND \"vacante\".\"tipo_vacante\" = \"vacante_tipo\".\"id_tipo\" AND \"vacante\".\"subido_por\" = :idAdmin  ";
			
			Query query_vac_no_filtro = session.createSQLQuery(sql_vac_no_filtro);
			
			query_vac_no_filtro.setParameter("idAdmin", idAdmin);
			
			query_vac_no_filtro.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List list_vac_no_filtro = query_vac_no_filtro.list();
			
			for (Object object : list_vac_no_filtro) {
		         Map row = (Map) object;
		         
		         
		         fol=(String)row.get("folio");
		        

		         nombreVacante = (String) row.get("nombre_vacante");
		         
		         String fechaxs = new SimpleDateFormat("dd/MM/yyyy").format(row.get("fecha_publicacion"));
		        
		         String fechaxs2 = new SimpleDateFormat("dd/MM/yyyy").format(row.get("fecha_vigencia"));
		       
		         destacado = (BigDecimal) row.get("destacado");
		         
		         subidoPor = (String) row.get("nombre");
		         
		         tipoVacante = (String) row.get("tipo_vacante");
		         
		         
		         
		       
		      
		         
		         
		     
		         	listaFolios.add(fol);
		         
		         
		         	listaNombreVacante.add(nombreVacante);
					
					listaSubidoPor.add(subidoPor);
					
					listaTipoVacante.add(tipoVacante);
					
					listaFechaP.add(fechaxs);
					
					listaFechaV.add(fechaxs2);
					
					listaDestacado.add(destacado);
		     	
		         
		         }
			
			
			
			numeroFilas = listaFolios.size();
			
			int b=0;
			for (j=2;j<=numeroFilas;j++){
				
				
				HSSFRow filaContenido  = hoja.createRow(j);
				
				HSSFCell celdaContenido1 = filaContenido.createCell(1);
				
				celdaContenido1.setCellValue(listaFolios.get( b ));
				
				
				
				HSSFCell celdaContenido2 = filaContenido.createCell(2);
				
				celdaContenido2.setCellValue(listaNombreVacante.get( b ));
				
				
				HSSFCell celdaContenido3 = filaContenido.createCell(3);
				
				celdaContenido3.setCellValue(listaFechaP.get( b ));
				
				
				HSSFCell celdaContenido4 = filaContenido.createCell(4);
				
				celdaContenido4.setCellValue(listaFechaV.get( b ));
				
				
				HSSFCell celdaContenido5 = filaContenido.createCell(5);
				
				celdaContenido5.setCellValue(listaSubidoPor.get( b ));
				
				
				HSSFCell celdaContenido6 = filaContenido.createCell(6);
				
				celdaContenido6.setCellValue(listaTipoVacante.get( b ));
				
				
				HSSFCell celdaContenido7 = filaContenido.createCell(7);
				
				celdaContenido7.setCellValue( listaDestacado.get( b ).doubleValue());
				
				
				
				b = b + 1;
				
				
			}
			
			
			
			
			try{
				
				
				
				rutaF = servletRequest.getSession().getServletContext().getRealPath("/");
		        routaF=rutaF+"/reportes";
				File folder = new File( routaF+"/"+directorioNombreAdmin);
				if (!folder.exists()) { 
					folder.mkdir();
				}
				
				
				String ruta = servletRequest.getSession().getServletContext().getRealPath("/");
		        String routa=rutaF+"/reportes/"+directorioNombreAdmin; 
		        String DBruta="reportes/"+directorioNombreAdmin+"/"+NombreArchivo+".xls" ;
		        
		        
		        DataOutputStream archivo = new DataOutputStream(new FileOutputStream(routa+"/"+NombreArchivo+".xls"));
		        
		        
		        
		        libro.write(archivo);
		        
		        archivo.close();
		        
		        
		        
		       
		        	FilesExcel Etsel = new FilesExcel();
		        	Etsel.setRutaFileExcel(DBruta);
		        	Etsel.setIdSubidoPor(idAdmin);
		       
		        
		       
		        HashMap<String, Object> itemMap = new HashMap<String, Object>();
	        	
	        	String mensaje1 = "Se ha Creado el Archivo Satisfactoriamente";
	        	
	        	String mensaje2 = DBruta;
	        	
	        	itemMap.put("error1", mensaje1);
	        	itemMap.put("ruta_nueva", mensaje2);
	        	items.add(itemMap);
	        	
	        	jsonDataCAE.put("Mensajes", items);
				
			}
			
			catch (Exception e){
				
				HashMap<String, Object> itemMap = new HashMap<String, Object>();
				
				String mensaje1 = "No se ha creado el archivo Satisfactoriamente";
				
				
				
	        	itemMap.put("error1", mensaje1);
	        	items.add(itemMap);
	        	
	        	jsonDataCAE.put("Mensajes", items);
				
			}
			
		}else{
			
		}
		
		
		trans.commit();
		}catch(Exception e){
			trans.rollback();
		}
		
		return SUCCESS;
	}
	
	
	public String escapeChars(String cadena){
	    
	    
	    String reg = "[=;*|()%#!&?]";
	  
	    String escapedString= cadena.replaceAll(reg,"");
	    
	    return escapedString;
	}

	public String getTipoExportacion() {
		return tipoExportacion;
	}

	public void setTipoExportacion(String tipoExportacion) {
		this.tipoExportacion = tipoExportacion;
	}

	public LinkedHashMap<String, Object> getJsonDataCAE() {
		return jsonDataCAE;
	}

	public void setJsonDataCAE(LinkedHashMap<String, Object> jsonDataCAE) {
		this.jsonDataCAE = jsonDataCAE;
	}

	public Set<Map<String, Object>> getItems() {
		return items;
	}

	public void setItems(Set<Map<String, Object>> items) {
		this.items = items;
	}

	public String getNombreArchivo() {
		return NombreArchivo;
	}

	
	
	 @Override
	    public void setServletRequest(HttpServletRequest servletRequest) {
	        this.servletRequest = servletRequest;
	 
	    }

	public String getNombreAdmin() {
		return nombreAdmin;
	}

	

	public String getDirectorioAnio() {
		return directorioAnio;
	}

	public void setDirectorioAnio(String directorioAnio) {
		this.directorioAnio = directorioAnio;
	}

	public String getDirectorioMes() {
		return directorioMes;
	}

	public void setDirectorioMes(String directorioMes) {
		this.directorioMes = directorioMes;
	}

	public String getDirectorioNombreAdmin() {
		return directorioNombreAdmin;
	}

	

	public String getRutaF() {
		return rutaF;
	}

	

	public String getRoutaF() {
		return routaF;
	}

	

	public int getNuevaCla() {
		return nuevaCla;
	}

	public void setNuevaCla(int nuevaCla) {
		this.nuevaCla = nuevaCla;
	}

	public BigDecimal getIdAdmin() {
		return idAdmin;
	}

	

	public String[] getFolio() {
		return folio;
	}

	public void setFolio(String folio[]) {
		this.folio = folio;
	}

	public String getFol() {
		return fol;
	}

	public void setFol(String fol) {
		this.fol = fol;
	}

	public List<String> getListaFolios() {
		return listaFolios;
	}

	public void setListaFolios(List<String> listaFolios) {
		this.listaFolios = listaFolios;
	}

	public ArrayList<String> getListafolios2() {
		return listafolios2;
	}

	public void setListafolios2(ArrayList<String> listafolios2) {
		this.listafolios2 = listafolios2;
	}

	public String getNombreVacante() {
		return nombreVacante;
	}

	public void setNombreVacante(String nombreVacante) {
		this.nombreVacante = nombreVacante;
	}

	public List<String> getListaNombreVacante() {
		return listaNombreVacante;
	}

	public void setListaNombreVacante(List<String> listaNombreVacante) {
		this.listaNombreVacante = listaNombreVacante;
	}

	public String getSubidoPor() {
		return subidoPor;
	}

	public void setSubidoPor(String subidoPor) {
		this.subidoPor = subidoPor;
	}

	public List<String> getListaSubidoPor() {
		return listaSubidoPor;
	}

	public void setListaSubidoPor(List<String> listaSubidoPor) {
		this.listaSubidoPor = listaSubidoPor;
	}

	public String getTipoVacante() {
		return tipoVacante;
	}

	public void setTipoVacante(String tipoVacante) {
		this.tipoVacante = tipoVacante;
	}

	public List<String> getListaTipoVacante() {
		return listaTipoVacante;
	}

	public void setListaTipoVacante(List<String> listaTipoVacante) {
		this.listaTipoVacante = listaTipoVacante;
	}

	public List<String> getListaFechaP() {
		return listaFechaP;
	}

	public void setListaFechaP(List<String> listaFechaP) {
		this.listaFechaP = listaFechaP;
	}

	public List<String> getListaFechaV() {
		return listaFechaV;
	}

	public void setListaFechaV(List<String> listaFechaV) {
		this.listaFechaV = listaFechaV;
	}

	public BigDecimal getDestacado() {
		return destacado;
	}

	public void setDestacado(BigDecimal destacado) {
		this.destacado = destacado;
	}

	public List<BigDecimal> getListaDestacado() {
		return listaDestacado;
	}

	public void setListaDestacado(List<BigDecimal> listaDestacado) {
		this.listaDestacado = listaDestacado;
	}
	
	
}
