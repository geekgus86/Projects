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
@Table(name="\"files_excel\"",schema="CU_CONSULTAE")
public class FilesExcel {
	
	
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO, generator="sec_mi_excel")
	@SequenceGenerator(name="sec_mi_excel", sequenceName="sec_mi_excel")
	@Column(name = "\"id_file_reporte\"")
	private BigDecimal idFileReporte;
	@Column(name = "\"ruta_file_excel\"")
	private String rutaFileExcel;
	@Column(name = "\"id_subido_por\"")
	private BigDecimal idSubidoPor;
	
	

	public BigDecimal getIdFileReporte() {
		return idFileReporte;
	}

	public void setIdFileReporte(BigDecimal idFileReporte) {
		this.idFileReporte = idFileReporte;
	}

	public String getRutaFileExcel() {
		return rutaFileExcel;
	}

	public void setRutaFileExcel(String rutaFileExcel) {
		this.rutaFileExcel = rutaFileExcel;
	}

	public BigDecimal getIdSubidoPor() {
		return idSubidoPor;
	}

	public void setIdSubidoPor(BigDecimal idSubidoPor) {
		this.idSubidoPor = idSubidoPor;
	}
	

}
