package iusacell.mdc.arh.entities;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;


@Entity
@Table(name="\"MDC_CAT_PREGUNTAS_ES\"",schema="BOLSAIUSACELL")
public class EntrevistaCalidadPreguntasVO {

    //@Transient
    //private EntrevistaCalidadOpcionesVO opciones;
    
	@Id
	@Column(name = "\"ID_PREGUNTA\"")
	private Integer idPregunta;
	
	@Column(name = "\"DESC_PREGUNTA\"")
	private String descPregunta;
	
	@Column(name = "\"TIPO_SALIDA\"")
	private String tipoSalida;
	
	@Column(name = "\"UBICACION\"")
	private String ubicacion;
	
	@Column(name = "\"VENTAS\"")
	private String ventas;
	
	//@OneToMany(mappedBy="MDC_CAT_PREGUNTAS_ES", cascade=CascadeType.ALL,fetch=FetchType.EAGER)
	//private Set<EntrevistaCalidadOpcionesVO> entCalPregOpciones;
	
	public EntrevistaCalidadPreguntasVO(){
	}
	
    public EntrevistaCalidadPreguntasVO(String tipoSalida) {
        this.tipoSalida = tipoSalida;
    }
	
	/*
	 * Getters and Setters
	 */
    
    public Integer getIdPregunta() {
        return idPregunta;
    }

    public void setIdPregunta(Integer idPregunta) {
        this.idPregunta = idPregunta;
    }

    public String getDescPregunta() {
        return descPregunta;
    }

    public void setDescPregunta(String descPregunta) {
        this.descPregunta = descPregunta;
    }

    public String getTipoSalida() {
        return tipoSalida;
    }

    public void setTipoSalida(String tipoSalida) {
        this.tipoSalida = tipoSalida;
    }

    public String getUbicacion() {
        return ubicacion;
    }

    public void setUbicacion(String ubicacion) {
        this.ubicacion = ubicacion;
    }

    public String getVentas() {
        return ventas;
    }

    public void setVentas(String ventas) {
        this.ventas = ventas;
    }	

}
