package iusacell.mdc.arh.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * 
 * @author jarredondoi
 *
 */
@Entity
@Table(name="\"MDC_CAT_PARAMETROS\"",schema="BOLSAIUSACELL")
public class ParametrosVO {

	@Id
	@Column(name = "\"PARAM_LLAV_PR\"")
	private Integer paramLlavPr;
	
	@Column(name = "\"PARAM_LLAVE\"")
	private String paramLlave;
	
	@Column(name = "\"PARAM_VALOR\"")
	private String paramValor;
	
	@Column(name = "\"PARAM_DESC\"")
	private String paramDesc;
	
	@Column(name = "\"ENCRIPTADO\"")
	private Boolean encriptado;
	
	public String toString(){
		StringBuffer sb = new StringBuffer();
		sb.append("paramLlavPr =").append(this.paramLlavPr).append(",");
		sb.append("paramLlave =").append(this.paramLlave).append(",");
		sb.append("paramValor =").append(this.paramValor).append(",");
		sb.append("paramDesc =").append(this.paramDesc).append(",");
		sb.append("encriptado =").append(this.encriptado);
		return sb.toString();
	}
	
	public Integer getParamLlavPr() {
		return paramLlavPr;
	}
	public void setParamLlavPr(Integer paramLlavPr) {
		this.paramLlavPr = paramLlavPr;
	}
	public String getParamLlave() {
		return paramLlave;
	}
	public void setParamLlave(String paramLlave) {
		this.paramLlave = paramLlave;
	}
	public String getParamValor() {
		return paramValor;
	}
	public void setParamValor(String paramValor) {
		this.paramValor = paramValor;
	}
	public String getParamDesc() {
		return paramDesc;
	}
	public void setParamDesc(String paramDesc) {
		this.paramDesc = paramDesc;
	}
	public Boolean getEncriptado() {
		return encriptado;
	}
	public void setEncriptado(Boolean encriptado) {
		this.encriptado = encriptado;
	}
}

