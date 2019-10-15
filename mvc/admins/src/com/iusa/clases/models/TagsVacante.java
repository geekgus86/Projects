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
@Table(name="\"tags_nuve\"", schema="CU_CONSULTAE")
public class TagsVacante {
	

	 @Id
	 @GeneratedValue(strategy=GenerationType.AUTO, generator="sec_tags_vac")
	 @SequenceGenerator(name="sec_tags_vac", sequenceName="sec_tags_vac")
	 @Column(name = "\"id_tag_nuve\"")
	 	private BigDecimal idTag;
	 @Column(name="\"tag_nuve\"")
	 	private String tagNuveVacante;
	 @Column(name="\"id_vacante\"")
	 	private BigDecimal idVacante;
	 
	 
	 
	public BigDecimal getIdTag() {
		return idTag;
	}
	public void setIdTag(BigDecimal idTag) {
		this.idTag = idTag;
	}
	public String getTagNuveVacante() {
		return tagNuveVacante;
	}
	public void setTagNuveVacante(String tagNuveVacante) {
		this.tagNuveVacante = tagNuveVacante;
	}
	public BigDecimal getIdVacante() {
		return idVacante;
	}
	public void setIdVacante(BigDecimal idVacante) {
		this.idVacante = idVacante;
	}
	

}
