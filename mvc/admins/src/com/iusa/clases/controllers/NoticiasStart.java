package com.iusa.clases.controllers;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;

import com.opensymphony.xwork2.ActionSupport;

public class NoticiasStart extends ActionSupport{


	
	private BigDecimal idBanner;
	private String rutaBanner;
	
	private List<BigDecimal> listaIdBanner;
	private List<String> listaRutaBanner;

	
	private BigDecimal idVideo;
	private String rutaVideo;
	private String dondeVa;
	
	private List<BigDecimal> listaIdVideo;
	private List<String> listaRutaVideo;
	private List<String> listaDondeVa;
	
	
	private BigDecimal idAdministrador;
	private String ceC;
	private String correo;
	private BigDecimal lvl;
	private String nombreAdmin;
	
	
	Session session;
	
	public NoticiasStart(){
		session=HibernateUtil.getSessionFactory().getCurrentSession();
	}
	
	public String execute(){
		
		Transaction trans = session.beginTransaction();
		
		try{
		
			String sql_banner_todo ="  SELECT \"img_banner\".\"id_banner\",	\"img_banner\".\"url_banner\" FROM \"img_banner\"  ";
			
			
			Query banner_query = session.createSQLQuery(sql_banner_todo);
			
			banner_query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List BQ = banner_query.list();
			
			 
			 listaIdBanner = new ArrayList<BigDecimal>();
			 listaRutaBanner = new ArrayList<String>();
			 
			for (Object object : BQ) {
		         Map row1 = (Map) object;
		         idBanner = (BigDecimal) row1.get("id_banner");
		         rutaBanner = (String) row1.get("url_banner");
		        
		         
		         listaIdBanner.add(idBanner);
		         listaRutaBanner.add(rutaBanner);
		
		      }
			
			
			
			String sql_video_todo ="  SELECT \"videos\".\"id_video\", \"videos\".\"url_video\", \"videos\".\"donde_va\" FROM \"videos\" ";
			
			
			Query video_query = session.createSQLQuery(sql_video_todo);
			
			video_query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List VQ = video_query.list();
			
			 
			listaIdVideo = new ArrayList<BigDecimal>();
			listaRutaVideo = new ArrayList<String>();
			listaDondeVa = new ArrayList<String>();
			 
			for (Object object : VQ) {
		         Map row2 = (Map) object;
		         idVideo = (BigDecimal) row2.get("id_video");
		         rutaVideo = (String) row2.get("url_video");
		         dondeVa = (String) row2.get("donde_va");
		        
		         
		         listaIdVideo.add(idVideo);
		         listaRutaVideo.add(rutaVideo);
		         listaDondeVa.add(dondeVa);
		
		      }
		
		

			trans.commit();
		}catch(Exception e){
			trans.rollback();
		}
		
		DatosAdmin DA = new DatosAdmin();
	     DA.execute();
	     idAdministrador = DA.getIdAdministrador();
	     correo = DA.getCorreo();
	     lvl = DA.getLvl();
	     nombreAdmin = DA.getNombreAdmin();
		
		return SUCCESS;
	}
	
	
	
	public BigDecimal getIdAdministrador() {
		return idAdministrador;
	}
	public void setIdAdministrador(BigDecimal idAdministrador) {
		this.idAdministrador = idAdministrador;
	}
	public String getCeC() {
		return ceC;
	}
	public void setCeC(String ceC) {
		this.ceC = ceC;
	}
	public String getCorreo() {
		return correo;
	}
	public void setCorreo(String correo) {
		this.correo = correo;
	}
	public BigDecimal getLvl() {
		return lvl;
	}
	public void setLvl(BigDecimal lvl) {
		this.lvl = lvl;
	}
	public String getNombreAdmin() {
		return nombreAdmin;
	}
	public void setNombreAdmin(String nombreAdmin) {
		this.nombreAdmin = nombreAdmin;
	}



	public BigDecimal getIdBanner() {
		return idBanner;
	}



	public void setIdBanner(BigDecimal idBanner) {
		this.idBanner = idBanner;
	}



	public String getRutaBanner() {
		return rutaBanner;
	}



	public void setRutaBanner(String rutaBanner) {
		this.rutaBanner = rutaBanner;
	}



	public List<BigDecimal> getListaIdBanner() {
		return listaIdBanner;
	}



	public void setListaIdBanner(List<BigDecimal> listaIdBanner) {
		this.listaIdBanner = listaIdBanner;
	}



	public List<String> getListaRutaBanner() {
		return listaRutaBanner;
	}



	public void setListaRutaBanner(List<String> listaRutaBanner) {
		this.listaRutaBanner = listaRutaBanner;
	}



	public BigDecimal getIdVideo() {
		return idVideo;
	}



	public void setIdVideo(BigDecimal idVideo) {
		this.idVideo = idVideo;
	}



	public String getRutaVideo() {
		return rutaVideo;
	}



	public void setRutaVideo(String rutaVideo) {
		this.rutaVideo = rutaVideo;
	}



	public String getDondeVa() {
		return dondeVa;
	}



	public void setDondeVa(String dondeVa) {
		this.dondeVa = dondeVa;
	}



	public List<BigDecimal> getListaIdVideo() {
		return listaIdVideo;
	}



	public void setListaIdVideo(List<BigDecimal> listaIdVideo) {
		this.listaIdVideo = listaIdVideo;
	}



	public List<String> getListaRutaVideo() {
		return listaRutaVideo;
	}



	public void setListaRutaVideo(List<String> listaRutaVideo) {
		this.listaRutaVideo = listaRutaVideo;
	}



	public List<String> getListaDondeVa() {
		return listaDondeVa;
	}



	public void setListaDondeVa(List<String> listaDondeVa) {
		this.listaDondeVa = listaDondeVa;
	}
	
	
	

}
