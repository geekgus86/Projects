package com.iusa.clases.models;

import java.math.BigDecimal;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name="\"postulaciones\"", schema="CU_CONSULTAE")
public class Postulaciones {
	
	 @Id
	 @GeneratedValue(strategy=GenerationType.AUTO, generator="seq_pos")
	 @SequenceGenerator(name="seq_pos", sequenceName="seq_pos")
	 @Column(name = "\"id_postulante_aux\"")
	    private int idPostulanteAux;
	 @Column(name="\"id_vacante\"")
	 	private BigDecimal idVacante;
	 @Column(name="\"id_usuario\"")
	 	private BigDecimal idUsuario;
	 
	 public Postulaciones(){
		 
	  }
	 
	 public  void setIdPostulanteAux(int idPostulanteAux ){
		 this.idPostulanteAux = idPostulanteAux;
	 }
	 
	 public  void setIdVacante(BigDecimal idVacante ){
		 this.idVacante = idVacante;
	 }
	 
	 public  void setIdUsuario(BigDecimal idUsuario ){
		 this.idUsuario = idUsuario;
	 }
	 
	 
	 public int IdUsuario(){
		   return idPostulanteAux;
		  }
	 
	 public BigDecimal getIdVacante(){
		   return idVacante;
		  }
	 
	 public BigDecimal getIdPostulante(){
		   return idUsuario;
		  }

}
