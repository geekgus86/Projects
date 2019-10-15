package com.iusa.clases.models;

import java.math.BigDecimal;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name="\"Aspiraciones\"",schema="CHIVOPERRO")
public class Aspiraciones {
	@Id
	@Column(name = "\"id_usuario\"")
    private BigDecimal idUsuario;
	@Column(name = "\"puesto_deseado\"")
    private String puestoDeseado;
	@Column(name = "\"objetivos\"")
    private String objetivos;
	@Column(name = "\"empleado_iusacell\"")
    private String empleadoIusacell;
	@Column(name = "\"empleado_salinas\"")
    private String empleadoSalinas;
	@Column(name = "\"empresa_salinas\"")
    private String empresaSalinas;
	@Column(name = "\"alguna_vez_iusa\"")
    private String algunaVez;

	public BigDecimal getIdUsuario() {
		return idUsuario;
	}

	public void setIdUsuario(BigDecimal idUsuario) {
		this.idUsuario = idUsuario;
	}

	public String getPuestoDeseado() {
		return puestoDeseado;
	}

	public void setPuestoDeseado(String puestoDeseado) {
		this.puestoDeseado = puestoDeseado;
	}

	public String getObjetivos() {
		return objetivos;
	}

	public void setObjetivos(String objetivos) {
		this.objetivos = objetivos;
	}

	public String getEmpleadoIusacell() {
		return empleadoIusacell;
	}

	public void setEmpleadoIusacell(String empleadoIusacell) {
		this.empleadoIusacell = empleadoIusacell;
	}

	public String getEmpleadoSalinas() {
		return empleadoSalinas;
	}

	public void setEmpleadoSalinas(String empleadoSalinas) {
		this.empleadoSalinas = empleadoSalinas;
	}

	public String getEmpresaSalinas() {
		return empresaSalinas;
	}

	public void setEmpresaSalinas(String empresaSalinas) {
		this.empresaSalinas = empresaSalinas;
	}

	public String getAlgunaVez() {
		return algunaVez;
	}

	public void setAlgunaVez(String algunaVez) {
		this.algunaVez = algunaVez;
	}
	
	
}
