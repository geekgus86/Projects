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
@Table(name="\"foto\"",schema="BOLSAIUSACELL")
public class Foto {
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO, generator="seq_fo")
	@SequenceGenerator(name="seq_fo", sequenceName="seq_fo")
	@Column(name = "\"id_foto\"")
	private int idFoto;
	@Column(name = "\"id_usuario\"")
    private BigDecimal idUsuario;
	@Column(name = "\"url_foto\"")
    private String urlFoto;
	@Column(name = "\"foto\"")
    private byte[] foto;
	
	public int getIdFoto() {
		return idFoto;
	}
	public void setIdFoto(int idFoto) {
		this.idFoto = idFoto;
	}
	public BigDecimal getIdUsuario() {
		return idUsuario;
	}
	public void setIdUsuario(BigDecimal idUsuario) {
		this.idUsuario = idUsuario;
	}
	public String getUrlFoto() {
		return urlFoto;
	}
	public void setUrlFoto(String urlFoto) {
		this.urlFoto = urlFoto;
	}
	public byte[] getFoto() {
		return foto;
	}
	public void setFoto(byte[] bFile) {
		this.foto = bFile;
	}
	
}
