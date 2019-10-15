package iusacell.mdc.arh.util;

import iusacell.mdc.arh.vo.ValueObject;

import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.List;

public class Reflection {

    @SuppressWarnings("rawtypes")
	private Class clase;
    @SuppressWarnings("rawtypes")
	private Class[] parametros;
    private boolean objectToString = false;
    
    public Reflection(String clase){
        try{
            //if(clase!=null && clase.lastIndexOf(".")>-1)
                //clase = clase.substring(clase.lastIndexOf(".")+1, clase.length());
            this.clase = Class.forName(clase);
        }catch(Exception exc){
            System.out.println("Imposible Cargar la Clase : "+clase);
        }
    }
    
    public String[] getMethods(){
        Method metodos[] = null;
        Method metodo = null;
        String[] strMetodos = null;
        try{
	        metodos = clase.getMethods();
	        strMetodos = new String[metodos.length];
	        int met = 0; 
	        for (int i=0; i < metodos.length; i++) {
	            metodo = metodos[i];
	            String strMetodo = metodo.getName();
                strMetodos[met] = strMetodo;
                met++;
	        }
        }catch(Exception exc){
        	System.out.println("Error al Obtener Los Metodos:");
        }
        return strMetodos;
    }
    
    /**
     * Regresa una lista con los metodos que inicien con el filtro indicado
     * @param filter String
     * @return List
     */
    public List<Object> getMethods(String filter){
        Method metodos[] = null;
        Method metodo = null;
        List<Object> strMetodos = null;
        try{
	        metodos = clase.getMethods();
	        strMetodos = new ArrayList<Object>();
	        for (int i=0; i < metodos.length; i++) {
	            metodo = metodos[i];
	            String strMetodo = metodo.getName();
	            if(strMetodo!=null && strMetodo.startsWith(filter)){
	                strMetodos.add(strMetodo);
	            }
	        }
        }catch(Exception exc){
        	System.out.println("Error al Obtener Los Metodos:");
        }
        return strMetodos;
    }
    
    public String getMethod(String filter){
        Method metodos[] = null;
        Method metodo = null;
        String strMetodo = null;
        try{
        	metodos = clase.getMethods();
	        for (int i=0; i < metodos.length; i++) {
	            metodo = metodos[i];
	            String strMet = metodo.getName();
	            if(strMet!=null && strMet.toUpperCase().endsWith(filter.toUpperCase())){
	                strMetodo = strMet;
	                parametros = metodo.getParameterTypes();
	                /*for (int j=0; j < parametros.length; j++) {
	                	System.out.print(parametros[j].getName());
	                	ifs (j < parametros.length-1) System.out.print(", ");
	                }*/
	                break;
	            }
	        }
        }catch(Exception exc){
        	System.out.println("Error al Obtener El Metodopor filtro:"+filter);
        }
        return strMetodo;
    }
    
    @SuppressWarnings({ "rawtypes", "unchecked" })
	public Object getValorMetodo(String metodo, ValueObject vo){
        Class[] cl = null;
        Object retobj1 = null;
        try{
            Method meth1 = clase.getMethod( metodo, cl);
            retobj1 = meth1.invoke(vo);
        }catch(Exception exc){
        	System.out.println("Error al Obtener el Valor del Metodo:"+metodo);
        }
        return retobj1;
    }
    
    @SuppressWarnings({ "rawtypes", "unchecked" })
	public void setValorMetodo(String metodo, ValueObject vo, Object[] args){
        Class[] cl = null;
        try{
        	cl = new Class[parametros.length];
        	for (int j=0; j < parametros.length; j++) {
        		if(objectToString){
        			cl[j] = Class.forName("java.lang.String");
        		}else{
        			cl[j] = Class.forName(parametros[j].getName());
        		}
        	}
            Method meth1 = clase.getMethod( metodo, cl);
            meth1.invoke(vo, args);
        }catch(Exception exc){
        	//exc.printStackTrace();
        	System.out.println("Error al asignar el Valor del Metodo:"+metodo);
        }
    }

	/**
	 * @return the objectToString
	 */
	public boolean isObjectToString() {
		return objectToString;
	}

	/**
	 * @param objectToString the objectToString to set
	 */
	public void setObjectToString(boolean objectToString) {
		this.objectToString = objectToString;
	}

}
