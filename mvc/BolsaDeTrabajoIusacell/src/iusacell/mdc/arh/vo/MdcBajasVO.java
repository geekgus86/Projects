/*
 * Created on 17/12/2008
 *
 */
package iusacell.mdc.arh.vo;

import java.util.List;


/**
 * @author Leonel Gaytan Clemente
 *
 */
public class MdcBajasVO extends ValueObject{
	
	private String[] campos = {"idEntrevista", "nombreCandidato", "fecha", "planCapacitacion",
			"apaternoCandidato", "amaternoCandidato","sapNumFuncion","sapDescFuncion", "sapIdPuesto",
			"sapDescPuesto", "numEmpleado", "ufPosicion", "lineaReporte", "entrevistaOperativa",
			"idEntrevistaFiltro", "rfcCandidato", "fechaContratacion", 
			"imss", "curp", "bajaNoEmp", "bajaPosicion", "bajaFuncion", "tipoReingreso",
			"idEstatusCL", "nomempladobaja", "sociedad"};
			
	public int[] longitudes;
	private int id;
	private String motivo;
	private String tipo;
	private String comentsol;
	private String fechabaja;
	private String numsolicitante;
	private String nomsolicitante;
	private String numautorizador;
	private String nomautorizador;
	private String fechasolicitud;
	private int estado;
	private String estatus;
	private String numerobaja;
	private String nomempladobaja;
	private String baja;
	private int total;
	private String sociedad;
	private String puestobaja;
	private String posicion;
	private String division;
	private String subdivision;
	private String lineareporte;
	private String clavetienda;
	private String desctienda;
	private String entrevista_salida;
	private String ligaESalida;
	
	private String estatusldf;
	private List<Object> adeudos;
	
	private String estatusfiniquito;
	
	private String cartaFiniquito;
	
	
	public String toString(){
		StringBuffer sb= new StringBuffer();
		sb.append("idEntrevista = "+this.id+"\n");
		sb.append("motivo = "+this.motivo+"\n");
		sb.append("tipo = "+this.tipo+"\n");
		sb.append("comentsol = "+this.comentsol+"\n");
		sb.append("numsolicitante = "+this.numsolicitante+"\n");
		sb.append("nomsolicitante = "+this.nomsolicitante+"\n");
		sb.append("numautorizador = "+this.numautorizador+"\n");
		sb.append("nomautorizador = "+this.nomautorizador+"\n");
		sb.append("fechasolicitud = "+this.fechasolicitud+"\n");
		sb.append("estado = "+this.estado+"\n");
		sb.append("estatus = "+this.estatus+"\n");
		sb.append("numerobaja = "+this.numerobaja+"\n");
		sb.append("cartaFiniquito = "+this.cartaFiniquito+"\n");
		sb.append("baja = "+this.baja+"\n");
		return sb.toString();
	}
	
	

	/**
	 * @return Devuelve ligaESalida.
	 */
	public String getLigaESalida() {
		return ligaESalida;
	}
	/**
	 * @param ligaESalida El ligaESalida a establecer.
	 */
	public void setLigaESalida(String ligaESalida) {
		this.ligaESalida = ligaESalida;
	}
	/**
	 * @return Devuelve entrevista_salida.
	 */
	public String getEntrevista_salida() {
		return entrevista_salida;
	}
	/**
	 * @param entrevista_salida El entrevista_salida a establecer.
	 */
	public void setEntrevista_salida(String entrevista_salida) {
		this.entrevista_salida = entrevista_salida;
	}
	public String getCartaFiniquito() {
		return cartaFiniquito;
	}
	public void setCartaFiniquito(String cartaFiniquito) {
		this.cartaFiniquito = cartaFiniquito;
	}
	public String getEstatusfiniquito() {
		return estatusfiniquito;
	}
	public void setEstatusfiniquito(String estatusfiniquito) {
		this.estatusfiniquito = estatusfiniquito;
	}
	public List<Object> getAdeudos() {
		return adeudos;
	}
	public void setAdeudos(List<Object> adeudos) {
		this.adeudos = adeudos;
	}
	public String getEstatusldf() {
		return estatusldf;
	}
	public void setEstatusldf(String estatusldf) {
		this.estatusldf = estatusldf;
	}
	public String getClavetienda() {
		return clavetienda;
	}
	public void setClavetienda(String clavetienda) {
		this.clavetienda = clavetienda;
	}
	public String getDesctienda() {
		return desctienda;
	}
	public void setDesctienda(String desctienda) {
		this.desctienda = desctienda;
	}
	public String getDivision() {
		return division;
	}
	public void setDivision(String division) {
		this.division = division;
	}
	public String getLineareporte() {
		return lineareporte;
	}
	public void setLineareporte(String lineareporte) {
		this.lineareporte = lineareporte;
	}
	public String getPosicion() {
		return posicion;
	}
	public void setPosicion(String posicion) {
		this.posicion = posicion;
	}
	public String getSubdivision() {
		return subdivision;
	}
	public void setSubdivision(String subdivision) {
		this.subdivision = subdivision;
	}
	public String getPuestobaja() {
		return puestobaja;
	}
	public void setPuestobaja(String puestobaja) {
		this.puestobaja = puestobaja;
	}
	public int getTotal() {
		return total;
	}
	public void setTotal(int total) {
		this.total = total;
	}
	public MdcBajasVO() {
		super();
	}
	
 

	/**
	 * @return the campos
	 */
	public String[] getCampos() {
		return campos;
	}

	/**
	 * @return the longitudes
	 */
	public int[] getLongitudes() {
		return longitudes;
	}


	
	
	public String getBaja() {
		return baja;
	}
	public void setBaja(String baja) {
		this.baja = baja;
	}
	public String getComentsol() {
		return comentsol;
	}
	public void setComentsol(String comentsol) {
		this.comentsol = comentsol;
	}
	public int getEstado() {
		return estado;
	}
	public void setEstado(int estado) {
		this.estado = estado;
	}
	public String getEstatus() {
		return estatus;
	}
	public void setEstatus(String estatus) {
		this.estatus = estatus;
	}
	public String getFechabaja() {
		return fechabaja;
	}
	public void setFechabaja(String fechabaja) {
		this.fechabaja = fechabaja;
	}
	public String getFechasolicitud() {
		return fechasolicitud;
	}
	public void setFechasolicitud(String fechasolicitud) {
		this.fechasolicitud = fechasolicitud;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getMotivo() {
		return motivo;
	}
	public void setMotivo(String motivo) {
		this.motivo = motivo;
	}
	public String getNomautorizador() {
		return nomautorizador;
	}
	public void setNomautorizador(String nomautorizador) {
		this.nomautorizador = nomautorizador;
	}
	public String getNomsolicitante() {
		return nomsolicitante;
	}
	public void setNomsolicitante(String nomsolicitante) {
		this.nomsolicitante = nomsolicitante;
	}
	public String getNumautorizador() {
		return numautorizador;
	}
	public void setNumautorizador(String numautorizador) {
		this.numautorizador = numautorizador;
	}
	public String getNumerobaja() {
		return numerobaja;
	}
	public void setNumerobaja(String numerobaja) {
		this.numerobaja = numerobaja;
	}
	public String getNumsolicitante() {
		return numsolicitante;
	}
	public void setNumsolicitante(String numsolicitante) {
		this.numsolicitante = numsolicitante;
	}
	public String getTipo() {
		return tipo;
	}
	public void setTipo(String tipo) {
		this.tipo = tipo;
	}
	public void setLongitudes(int[] longitudes) {
		this.longitudes = longitudes;
	}
	public String getNomempladobaja() {
        return nomempladobaja;
    }
	public void setNomempladobaja(String nomempladobaja) {
        this.nomempladobaja = nomempladobaja;
    }
	public String getSociedad() {
        return sociedad;
    }
    public void setSociedad(String sociedad) {
        this.sociedad = sociedad;
    }
}
