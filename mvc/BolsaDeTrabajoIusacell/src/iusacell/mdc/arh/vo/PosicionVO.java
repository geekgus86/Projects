/*
 * Created on 23/04/2009
 *
 */
package iusacell.mdc.arh.vo;

import java.util.List;

/**
 * @author GGONZALEZE
 *
 */
public class PosicionVO extends ValueObject{
    public String usuario;
    public String claveOrganizativa;
    public String descripcionUnidadOrganizativa;
    public String posicion;
    public String descPosicion;
    
    public String division;
    public String nomDivision;
    public String subdivision;
    public String nomSubdivision;
    public String sociedad;
    
    public String Ename;
    public String nombreEmp;
    public String funcion;
    public String nomFuncion;
    public String cluster;  //rvt 
    public List<Object> lstPosAsignadas; //rvt
    
    public String descPlaza;   //rvt
    public String descAreaNom; //rvt
    public String clvAreaNom; //rvt
    public String lineaReporte; //rvt
    public String nomLineaReporte; //rvt
    public String posLineaReporte; //rvt
    public String descPosLineaReporte; //rvt
    public String numEmp;
    public String numEmpJefe; //yoc
    public String nomEmpJefe; //yoc
    
    //Se agregan nuevos campos de consulta
    private String[] campos = {"numEmp", "nombreEmp", "posicion", "descPosicion","claveOrganizativa",
			   "descripcionUnidadOrganizativa", "division", "nomDivision", "funcion", 
			   "nomFuncion", "noEmpLineaReporte", "nomLineaReporte", "posLineaReporte", 
			   "descPosLineaReporte"};
    
    public String toString(){
    	StringBuffer sb = new StringBuffer(super.toString());
    	sb.append("numEmp = ").append(this.numEmp).append(",");
    	sb.append("nombreEmp = ").append(this.nombreEmp).append(",");
    	sb.append("posicion = ").append(this.posicion).append(",");
    	sb.append("descPosicion = ").append(this.descPosicion).append(",");
    	sb.append("claveOrganizativa = ").append(this.claveOrganizativa).append(",");
    	sb.append("descripcionUnidadOrganizativa = ").append(this.descripcionUnidadOrganizativa).append(",");
    	sb.append("division = ").append(this.division).append(",");
    	sb.append("nomDivision = ").append(this.nomDivision).append(",");
    	sb.append("funcion = ").append(this.funcion).append(",");
    	sb.append("nomFuncion = ").append(this.nomFuncion).append(",");
    	sb.append("noEmpLineaReporte = ").append(String.valueOf(new Integer(this.lineaReporte))).append(",");
    	sb.append("nomLineaReporte = ").append(this.nomLineaReporte).append(",");
    	sb.append("posLineaReporte = ").append(this.posLineaReporte).append(",");
    	sb.append("descPosLineaReporte = ").append(this.descPosLineaReporte).append(",");
    	return sb.toString();
    }
    
    
    
	/**
	 * @return Devuelve nomEmpJefe.
	 */
	public String getNomEmpJefe() {
		return nomEmpJefe;
	}
	/**
	 * @param nomEmpJefe El nomEmpJefe a establecer.
	 */
	public void setNomEmpJefe(String nomEmpJefe) {
		this.nomEmpJefe = nomEmpJefe;
	}
	/**
	 * @return Devuelve numEmpJefe.
	 */
	public String getNumEmpJefe() {
		return numEmpJefe;
	}
	/**
	 * @param numEmpJefe El numEmpJefe a establecer.
	 */
	public void setNumEmpJefe(String numEmpJefe) {
		this.numEmpJefe = numEmpJefe;
	}
	public String getFuncion() {
		return funcion;
	}
	public void setFuncion(String funcion) {
		this.funcion = funcion;
	}
	public String getEname() {
		return Ename;
	}
	public void setEname(String ename) {
		Ename = ename;
	}
	public String getNomDivision() {
		return nomDivision;
	}
	public void setNomDivision(String nomDivision) {
		this.nomDivision = nomDivision;
	}
    public String getClaveOrganizativa() {
        return claveOrganizativa;
    }
    public void setClaveOrganizativa(String claveOrganizativa) {
        this.claveOrganizativa = claveOrganizativa;
    }
    public String getDescripcionUnidadOrganizativa() {
        return descripcionUnidadOrganizativa;
    }
    public void setDescripcionUnidadOrganizativa(String descripcionUnidadOrganizativa) {
        this.descripcionUnidadOrganizativa = descripcionUnidadOrganizativa;
    }
    public String getPosicion() {
        return posicion;
    }
    public void setPosicion(String posicion) {
        this.posicion = posicion;
    }
    public String getUsuario() {
        return usuario;
    }
    public void setUsuario(String usuario) {
        this.usuario = usuario;
    }
	public String[] getCampos() {
		return campos;
	}
	public int[] getLongitudes() {
		return null;
	}
	public String getDescPosicion() {
		return descPosicion;
	}
	public void setDescPosicion(String descPosicion) {
		this.descPosicion = descPosicion;
	}
	public String getCluster() {
		return cluster;
	}
	public void setCluster(String cluster) {
		this.cluster = cluster;
	}
	public List<Object> getLstPosAsignadas() {
		return lstPosAsignadas;
	}
	public void setLstPosAsignadas(List<Object> lstPosAsignadas) {
		this.lstPosAsignadas = lstPosAsignadas;
	}
	public String getClvAreaNom() {
		return clvAreaNom;
	}
	public void setClvAreaNom(String clvAreaNom) {
		this.clvAreaNom = clvAreaNom;
	}
	public String getDescAreaNom() {
		return descAreaNom;
	}
	public void setDescAreaNom(String descAreaNom) {
		this.descAreaNom = descAreaNom;
	}
	public String getDescPlaza() {
		return descPlaza;
	}
	public void setDescPlaza(String descPlaza) {
		this.descPlaza = descPlaza;
	}
	public String getLineaReporte() {
		return lineaReporte;
	}
	public void setLineaReporte(String lineaReporte) {
		this.lineaReporte = lineaReporte;
	}
	public String getNumEmp() {
		return numEmp;
	}
	public void setNumEmp(String numEmp) {
		this.numEmp = numEmp;
	}
	public String getDescPosLineaReporte() {
		return descPosLineaReporte;
	}
	public void setDescPosLineaReporte(String descPosLineaReporte) {
		this.descPosLineaReporte = descPosLineaReporte;
	}
	public String getDivision() {
		return division;
	}
	public void setDivision(String division) {
		this.division = division;
	}
	public String getNomFuncion() {
		return nomFuncion;
	}
	public void setNomFuncion(String nomFuncion) {
		this.nomFuncion = nomFuncion;
	}
	public String getNomLineaReporte() {
		return nomLineaReporte;
	}
	public void setNomLineaReporte(String nomLineaReporte) {
		this.nomLineaReporte = nomLineaReporte;
	}
	public String getPosLineaReporte() {
		return posLineaReporte;
	}
	public void setPosLineaReporte(String posLineaReporte) {
		this.posLineaReporte = posLineaReporte;
	}
	public String getNombreEmp() {
		return nombreEmp;
	}
	public void setNombreEmp(String nombreEmp) {
		this.nombreEmp = nombreEmp;
	}
	public String getNomSubdivision() {
		return nomSubdivision;
	}
	public void setNomSubdivision(String nomSubdivision) {
		this.nomSubdivision = nomSubdivision;
	}
	public String getSociedad() {
		return sociedad;
	}
	public void setSociedad(String sociedad) {
		this.sociedad = sociedad;
	}
	public String getSubdivision() {
		return subdivision;
	}
	public void setSubdivision(String subdivision) {
		this.subdivision = subdivision;
	}	
}