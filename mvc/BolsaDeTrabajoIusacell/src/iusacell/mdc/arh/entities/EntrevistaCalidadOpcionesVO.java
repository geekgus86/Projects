package iusacell.mdc.arh.entities;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;


@Entity
@Table(name="\"MDC_OPC_PREGUNTAS_ES\"",schema="BOLSAIUSACELL")
public class EntrevistaCalidadOpcionesVO {
	
    //@Transient
    //private EntrevistaCalidadPreguntasVO preguntas;
    
	@Id
	@Column(name = "\"ID_OPC\"")
	private Integer idOpcion;
	
	@Column(name = "\"ID_PREGUNTA\"")
	private Integer idPregunta;
	
	//@ManyToOne
	//@JoinColumn(name = "idPregunta", referencedColumnName = "id_pregunta")
	//private EntrevistaCalidadPreguntasVO entCalPreguntas;
	
	@Column(name = "\"DESC_OPCION\"")
	private String descOpcion;
	
	@Column(name = "\"TIPO\"")
	private String tipo;
	
	@Column(name = "\"CAMPO_EXTRA\"")
	private String campoExtra;

	@Column(name = "\"OPCIONES\"")
	private String opciones;
	
	public EntrevistaCalidadOpcionesVO(Integer idPregunta) {
		this.idPregunta = idPregunta;
	}
	
    /*
     * Getters and Setters
     */
    public Integer getIdOpcion() {
        return idOpcion;
    }
    
    public void setIdOpcion(Integer idOpcion) {
        this.idOpcion = idOpcion;
    }
    
    public Integer getIdPregunta() {
        return idPregunta;
    }
    
    public void setIdPregunta(Integer idPregunta) {
        this.idPregunta = idPregunta;
    }
    
    public String getDescOpcion() {
        return descOpcion;
    }

    public void setDescOpcion(String descOpcion) {
        this.descOpcion = descOpcion;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public String getCampoExtra() {
        return campoExtra;
    }

    public void setCampoExtra(String campoExtra) {
        this.campoExtra = campoExtra;
    }

    public String getOpciones() {
        return opciones;
    }

    public void setOpciones(String opciones) {
        this.opciones = opciones;
    }
    
}
