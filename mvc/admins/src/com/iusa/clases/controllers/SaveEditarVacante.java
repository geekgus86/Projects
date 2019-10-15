package com.iusa.clases.controllers;

import java.math.BigDecimal;
import java.text.SimpleDateFormat;

import javax.servlet.http.HttpServletRequest;

import org.apache.struts2.ServletActionContext;
import org.hibernate.Session;
import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;

public class SaveEditarVacante extends GuardaVacante{
	
	
	
	
	
	private String fechaVigenciaEditar;
	
	
	
	
	
	
private BigDecimal sueldoVacante_na;
	
	public BigDecimal getSueldoVacante_na() {
		return sueldoVacante_na;
	}

	public void setSueldoVacante_na(BigDecimal sueldoVacante_na) {
		this.sueldoVacante_na = sueldoVacante_na;
	}
	
	
	
	Session session;
	
	public SaveEditarVacante() throws Exception{
		
		session=HibernateUtil.getSessionFactory().getCurrentSession();
	}
	
	public String execute() {
		
		
		HttpServletRequest request = ServletActionContext.getRequest();
        
        String selec_id=escapeChars(request.getParameter("idVacante"));
         
        Transaction tr = session.beginTransaction();
        
        
        
         String secureidVacante = escapeChars(selec_id);
	     String securenombreVacante = escapeChars(nombreVacante);
	     String securefolio = escapeChars(folio);
	     String securefechaPublicacion= escapeChars(fechaPublicacion);
	     String securetextoIntroductorio = escapeChars(textoIntroductorio);
	     String secureescolaridad = escapeChars(escolaridad);
	     String securesueldoVacante = escapeChars(sueldoVacante);
	     String secureaniosExperiencia = escapeChars(aniosExperiencia);
	     String secureconocimientos = escapeChars(conocimientos);
	     String securetalentos = escapeChars(talentos);
	     String secureubicacion = escapeChars(ubicacion);
	     String secureestadoVacante = escapeChars(estadoVacante);
	     String securedestacado = escapeChars(destacado);
	     String secureareaExperiencia = escapeChars(areaExperiencia);
	     String secureprinFuncionesVacante = escapeChars(prinFuncionesVacante);
	     String securetipoVacante = escapeChars(tipoVacante);
	     String securehorario = escapeChars(horario);
	     String secureedad = escapeChars(edad);
	     String secureobservaciones = escapeChars(observaciones);
	     String securesubidoPor = escapeChars(subidoPor);
	     
	     
	     
	     String secureGenero = escapeChars(genero_preferencia);
	     String secureEstavac = escapeChars(vacante_esta_en);
	     String secureDesNa = escapeChars(destacado_nacional);
	     String secureRegion = escapeChars(region);
		
		
		
	     float securesueldoVacanteAux = Float.parseFloat(securesueldoVacante);
		
	     BigDecimal AuxaniosExp = new BigDecimal(secureaniosExperiencia);
	     
	     BigDecimal AuxDestacados = new BigDecimal(securedestacado);
	     
	     BigDecimal AuxTipoVac = new BigDecimal(securetipoVacante);
	     
	     BigDecimal AuxSubPor = new BigDecimal(securesubidoPor);
	     
	     BigDecimal AuxDesNa = new BigDecimal(secureDesNa);
	     
	     BigDecimal AuxRegio = new BigDecimal(secureRegion);
        
        
        
        
        
        
        try{
        	String[] nomvacant= securenombreVacante.split("-");
        	
         String sql2="UPDATE \"vacante\" SET \"vacante\".\"anios_experiencia\" = :aniosExperiencia, \"vacante\".\"area_experiencia\" = :areaExperiencia, \"vacante\".\"conocimientos\" = :conocimientos, \"vacante\".\"destacado\" = :destacado, \"vacante\".\"edad\" = :edad, \"vacante\".\"escolaridad\" = :escolaridad, \"vacante\".\"estado_vacante\" = :estadoVacante, \"vacante\".\"fecha_publicacion\" = :fechaPublicacion, \"vacante\".\"fecha_vigencia\" = :fechaVigenciaEditar, \"vacante\".\"folio\" = :folio, \"vacante\".\"horario\" = :horario, \"vacante\".\"nombre_vacante\" = :nombreVacante, \"vacante\".\"observaciones\" = :observaciones, \"vacante\".\"principales_funciones\" = :prinFuncionesVacante, \"vacante\".\"subido_por\" = :subidoPor, \"vacante\".\"sueldo_vacante\" = :sueldoVacante, \"vacante\".\"talentos\" = :talentos, \"vacante\".\"texto_introductorio\" = :textoIntroductorio, \"vacante\".\"tipo_vacante\" = :tipoVacante, \"vacante\".\"ubicacion\" = :ubicacion, \"vacante\".\"genero_preferencia\" = :genero_preferencia, \"vacante\".\"vacante_esta_en\" = :vacante_esta_en, \"vacante\".\"destacado_nacional\" = :destacado_nacional, \"vacante\".\"region\" = :region  WHERE \"vacante\".\"id_vacante\" = :selec_id ";
         Query query2 = session.createSQLQuery(sql2);
         
         query2.setParameter("aniosExperiencia", AuxaniosExp).setParameter("areaExperiencia", secureareaExperiencia).setParameter("conocimientos", secureconocimientos).setParameter("destacado", AuxDestacados).setParameter("edad", secureedad).setParameter("escolaridad", secureescolaridad).setParameter("estadoVacante", secureestadoVacante).setParameter("fechaPublicacion", securefechaPublicacion).setParameter("fechaVigenciaEditar", fechaVigenciaEditar).setParameter("folio", securefolio).setParameter("horario", securehorario).setParameter("nombreVacante", nomvacant[0]+"-"+secureubicacion).setParameter("observaciones", secureobservaciones).setParameter("prinFuncionesVacante", secureprinFuncionesVacante).setParameter("subidoPor", AuxSubPor).setParameter("sueldoVacante", securesueldoVacanteAux).setParameter("talentos", securetalentos).setParameter("textoIntroductorio", securetextoIntroductorio).setParameter("tipoVacante", AuxTipoVac).setParameter("ubicacion", secureubicacion).setParameter("genero_preferencia", secureGenero).setParameter("vacante_esta_en", secureEstavac).setParameter("destacado_nacional", AuxDesNa).setParameter("region", AuxRegio).setParameter("selec_id", secureidVacante);
         query2.executeUpdate();
         
        tr.commit();
        }catch(Exception e){
        	tr.rollback();
        }
		
		
		
		return SUCCESS;
	}
	
	


	public String getFechaVigenciaEditar() {
		return fechaVigenciaEditar;
	}

	public void setFechaVigenciaEditar(String fechaVigenciaEditar) {
		this.fechaVigenciaEditar = fechaVigenciaEditar;
	}

}
