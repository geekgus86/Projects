package com.iusa.clases.models;

import java.math.*;
import java.util.*;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;


@Entity
@Table(name="\"tags_usuario\"",schema="BOLSAIUSACELL")

public class Tags {


	@Id
	@Column(name = "\"id_usuario\"")
    private BigDecimal idUsuario;
	@Column(name = "\"tag_usuario_talentos\"")
	private String tagsTalentos;
	@Column(name = "\"tag_formacion\"")
	private String tagsEducacion;
	@Column(name = "\"tag_experiencia\"")
	private String tagsExperiencia;
	@Column(name = "\"tag_identidad\"")
	private String tagsIdentidad;
	@Column(name = "\"tag_hobbie\"")
	private String tagsHobbie;
	@Column(name = "\"tag_sw\"")
	private String tagsSoftware;
	
	public BigDecimal getIdUsuario() {
		return idUsuario;
	}
	public void setIdUsuario(BigDecimal idUsuario) {
		this.idUsuario = idUsuario;
	}
	public String getTagsTalentos() {
		return tagsTalentos;
	}
	public void setTagsTalentos(String tagsTalentos) {
		this.tagsTalentos = tagsTalentos;
	}
	public String getTagsEducacion() {
		return tagsEducacion;
	}
	public void setTagsEducacion(String tagsEducacion) {
		this.tagsEducacion = tagsEducacion;
	}
	public String getTagsExperiencia() {
		return tagsExperiencia;
	}
	public void setTagsExperiencia(String tagsExperiencia) {
		this.tagsExperiencia = tagsExperiencia;
	}
	public String getTagsIdentidad() {
		return tagsIdentidad;
	}
	public void setTagsIdentidad(String tagsIdentidad) {
		this.tagsIdentidad = tagsIdentidad;
	}
	public String getTagsHobbie() {
		return tagsHobbie;
	}
	public void setTagsHobbie(String tagsHobbie) {
		this.tagsHobbie = tagsHobbie;
	}
	public String getTagsSoftware() {
		return tagsSoftware;
	}
	public void setTagsSoftware(String tagsSoftware) {
		this.tagsSoftware = tagsSoftware;
	}

	
	
	
	
	


}
