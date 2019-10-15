/*
 * Created on 7/11/2008
 *
 */
package iusacell.mdc.arh.util;

import iusacell.mdc.arh.vo.FechaVO;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.List;
import java.util.Locale;
import java.util.StringTokenizer;

import org.apache.log4j.Logger;

/**
 * @author Leonel Gaytan Clemente
 *
 */
public class Fecha {
	
	private static Logger log = Logger.getLogger(Fecha.class);
	private static String DATE_FORMAT	= "dd.MMMMMMMMMM.yyyy";
	
	/**
	 * retorna la fecha actual del sistema
	 * @param dateFormat (E yyyy.MM.dd 'at' hh:mm:ss a zzz, dd-mm-yyyy , dd/mm/yyyy)
	 * @return
	 */
	public static String getFechaActual(String dateFormat){
		Calendar now = Calendar.getInstance();
        //SimpleDateFormat formatter = new SimpleDateFormat("E yyyy.MM.dd 'at' hh:mm:ss a zzz");
		Locale locale = new Locale("es", "MX");
        SimpleDateFormat formatter = new SimpleDateFormat(dateFormat, locale);
        return formatter.format(now.getTime());
	}
	public static String getDateFormat(Date fecha,String dateFormat){
		SimpleDateFormat formatter = new SimpleDateFormat(dateFormat);
        //log.info("fecha del sistema ="+formatter.format(fecha));
        return formatter.format(fecha);
	}
	public static String getFormat(String fecha,String dateFormat){
		SimpleDateFormat formatter = new SimpleDateFormat(dateFormat);
        //log.info("fecha del sistema ="+formatter.format(fecha));
        return formatter.format(fecha);
	}
	public static Date getDate(String date){
		DateFormat df = new SimpleDateFormat("dd/MM/yyyy");
		Date fecha = null;
        try{
        	fecha = df.parse(date);            
        } catch (ParseException e){
            e.printStackTrace();
        } 
        return fecha;
	}
	

	/**
	 * Regresa uan fecha SQL a partir de un string
	 * @param fecha String
	 * @param separador String
	 * @return
	 */
	public static java.sql.Date getDateSql(String fecha, String separador){
    	StringTokenizer st = new StringTokenizer(fecha, separador);
    	Calendar c1 = Calendar.getInstance();
        String dia = st.nextToken();
        String mes = st.nextToken();
        String anio = st.nextToken();
    	c1.set(Integer.parseInt(anio),Integer.parseInt(mes)-1,Integer.parseInt(dia));
    	java.sql.Date date = new java.sql.Date(c1.getTimeInMillis());
    	return date;
	}
	public static Date getDateFormat(String date,String dateFormat){
		DateFormat df = new SimpleDateFormat(dateFormat);
		Date fecha = null;
        try{
        	fecha = df.parse(date);            
        } catch (ParseException e){
            e.printStackTrace();
        } 
        return fecha;
	}
	public static List<FechaVO>  getFechasContratacion(String fecha){
		List<FechaVO> fechasContratacion = new ArrayList<FechaVO>();
		 Calendar cal = null;
		 FechaVO fechaVO= null;
		 DateFormat formatter = new SimpleDateFormat("dd.MM.yyyy"); ; 
          SimpleDateFormat sdf = new SimpleDateFormat(DATE_FORMAT);
		 GregorianCalendar calendar = new GregorianCalendar();
		try { 
	        Date date; 
	        date = (Date)formatter.parse(fecha); 
	        cal=Calendar.getInstance();
	        cal.setTime(date);
		} catch (ParseException e){
			log.info("Exception :"+e);  
		}  
		
		calendar.setTime(cal.getTime());
		fechaVO = new FechaVO();
		fechaVO.setFecha(fecha);
		fechaVO.setFechaCompleta(getDiaSemena(calendar.get(Calendar.DAY_OF_WEEK))+" "+sdf.format(cal.getTime()));
		fechasContratacion.add(fechaVO);
		
		for(int i=1;i<6;i++){
			cal.add(Calendar.DATE,1);
			calendar.setTime(cal.getTime());
			fechaVO = new FechaVO();
			fechaVO.setFecha(formatter.format(cal.getTime()));
			fechaVO.setFechaCompleta(getDiaSemena(calendar.get(Calendar.DAY_OF_WEEK))+" "+sdf.format(cal.getTime()));
			fechasContratacion.add(fechaVO);
		}
		
        return  fechasContratacion;
	}

	private static String getDiaSemena(int dia){
		String nombreDia = "";
		switch(dia){
	     //domingo
			case 1:nombreDia = "Domingo";break;
			case 2:nombreDia = "Lunes";break;
			case 3:nombreDia = "Martes";break;
			case 4:nombreDia = "Miercoles";break;
			case 5:nombreDia = "Jueves";break;
			case 6:nombreDia = "Viernes";break;
			case 7:nombreDia = "Sabado";break;
		}
		return nombreDia;
	}
	
	/**
	 * Regresa la fecha iniciando el Lunes a partir de la fecha actual
	 * @param formato String 
	 * @return String
	 */
	public static String getFechaInicioSemana(String formato){
    	return(getFechaInicioSemana(null, formato));
    }
	
	/**
	 * Regresa la fecha terminando el Domingo a partir de la fecha actual
	 * @param formato String 
	 * @return String
	 */
    public static String getFechaFinSemana(String formato){
    	return(getFechaFinSemana(null, formato));
    }
    
    public static String getFechaInicioMes(){
		return(Fecha.getFechaActual("01/MM/yyyy"));
    }
    
    public static String getFechaFinMes(){
    	String mes = Fecha.getFechaActual("MM");
    	int anio = Integer.parseInt(Fecha.getFechaActual("yyyy"));
		int diasMes = Fecha.getDiasDelMes(Integer.parseInt(mes), anio);
		return(Fecha.getFechaActual(String.valueOf(diasMes)+"/MM/yyyy"));
    }
    
    public static int getDiasDelMes(int mes, int anio){
    	int dias = 0;
    	switch(mes){
    		case 1: dias = 31;break;
    		case 2: 
    			if((anio % 4 == 0) && ((anio % 100 != 0) || (anio % 400 == 0)))
    				dias = 29;
    			else
    				dias = 28;
    			break;
    		case 3: dias = 31;break;
    		case 4: dias = 30;break;
    		case 5: dias = 31;break;
    		case 6: dias = 30;break;
    		case 7: dias = 31;break;
    		case 8: dias = 31;break;
    		case 9: dias = 30;break;
    		case 10: dias = 31;break;
    		case 11: dias = 30;break;
    		case 12: dias = 31;break;
    	}
    	return dias;
    }
    
    public static int getDiasDelMes(Date fecha){
    	int dias = 0;
    	GregorianCalendar gc = new GregorianCalendar();
    	gc.setTime(fecha);
    	int mes = gc.get(Calendar.MONTH);
    	int anio = gc.get(Calendar.YEAR);
    	switch(mes){
    		case 0: dias = 31;break;
    		case 1:
    			if((anio % 4 == 0) && ((anio % 100 != 0) || (anio % 400 == 0)))
    				dias = 29;
    			else
    				dias = 28;
    			break;
    		case 2: dias = 31;break;
    		case 3: dias = 30;break;
    		case 4: dias = 31;break;
    		case 5: dias = 30;break;
    		case 6: dias = 31;break;
    		case 7: dias = 31;break;
    		case 8: dias = 30;break;
    		case 9: dias = 31;break;
    		case 10: dias = 30;break;
    		case 11: dias = 31;break;
    	}
    	return dias;
    }
	
    public static String changeSeparatorDate(String fecha, String separador, String nuevoSep){
    	StringTokenizer st = new StringTokenizer(fecha, separador);
        String dat1 = st.nextToken();
        String dat2 = st.nextToken();
        String dat3 = st.nextToken();
    	return dat1+ nuevoSep+dat2+ nuevoSep+dat3;
	}
    
    public static boolean revisarFormato(String fecha, String separador){
    	StringTokenizer st = new StringTokenizer(fecha, separador);
    	if(st.countTokens()>2)
    	{
    		String dat1 = st.nextToken();
    		String dat2 = st.nextToken();
            String dat3 = st.nextToken();
    		try{
    			if(Integer.parseInt(dat1)<=31)
    			{
    				try{
    	    			if(Integer.parseInt(dat2)<=12)
    	    			{
    	    				try{
    	    	    			if(Integer.parseInt(dat3)== Integer.parseInt(Fecha.getFechaActual("yyyy")))
    	    	    			{
    	    	    				return true;
    	    	    			}
    	    	    			return false;
    	    	    		}catch (Exception E) {return false;}    	    	    		
    	    			}
    	    		}catch (Exception E) {return false;}
    			}
    		}catch (Exception E) {return false;}            
    	}else return false;
		return false;

	}
    
    public static String addDayDateCurrent(String dateFormat, int days){
			Calendar now = Calendar.getInstance();
			Locale locale = new Locale("es", "MX");
	        SimpleDateFormat formatter = new SimpleDateFormat(dateFormat, locale);
	        String fecha = formatter.format(now.getTime());
	        now.add(Calendar.DATE,days);
	        fecha = formatter.format(now.getTime());
	        return fecha;
	}
    
   
    public static Date addDaytoDate(Date date, int days){
    	Calendar cal = Calendar.getInstance();
        cal.setTime(date);
		cal.add(Calendar.DATE,days);
        return cal.getTime();
    }
    
    public static void main(String arg[]) throws Exception{
		try{
			System.out.println(Fecha.addDayDateCurrent("dd/MM/yyyy",-20));
		}catch(Exception exc){
			exc.printStackTrace();
		}
	}
    
    public static List<FechaVO> getFechaContratacionSemana(int semanas){
    	List<FechaVO> fechasContratacion = new ArrayList<FechaVO>();
    	Calendar cal = null;
    	FechaVO fechaVOS= null;
    	DateFormat formatter = new SimpleDateFormat("dd.MM.yyyy");
    	SimpleDateFormat sdf = new SimpleDateFormat(DATE_FORMAT);
    	Locale locale = new Locale("es", "MX");
    	GregorianCalendar gc = new GregorianCalendar(locale);
        cal=Calendar.getInstance();
		/** Calculo para Semana **/
    	gc.setTime(cal.getTime());
    	int dia = gc.get(Calendar.DAY_OF_WEEK);
		//Domingo 1, Lunes 2, Martes 3, Miercoles 4, Jueves 5, Viernes 6, Sabado 7
    	switch(dia){
    		case 2: cal.add(Calendar.DATE,7); break;
	       	case 3: cal.add(Calendar.DATE,6); break;
	       	case 4: cal.add(Calendar.DATE,5); break;
	       	case 5: cal.add(Calendar.DATE,4); break;
	       	case 6: cal.add(Calendar.DATE,3); break;
	       	case 7: cal.add(Calendar.DATE,2); break;
	       	case 1: cal.add(Calendar.DATE,1); break;
    	}
    	gc.setTime(cal.getTime());
    	fechaVOS= new FechaVO();
    	fechaVOS.setFecha(formatter.format(cal.getTime()));
		fechaVOS.setFechaCompleta(getDiaSemena(gc.get(Calendar.DAY_OF_WEEK))+" "+sdf.format(cal.getTime()));
		fechasContratacion.add(fechaVOS);
		for(int i=1; i<semanas; i++){
			cal.add(Calendar.DATE,7);
			gc.setTime(cal.getTime());
			fechaVOS= new FechaVO();
	    	fechaVOS.setFecha(formatter.format(cal.getTime()));
			fechaVOS.setFechaCompleta(getDiaSemena(gc.get(Calendar.DAY_OF_WEEK))+" "+sdf.format(cal.getTime()));
			fechasContratacion.add(fechaVOS);
		}
        return  fechasContratacion;
	}
    
    public static List<FechaVO> getFechaContratacionQuincena(int quincenas){
    	List<FechaVO> fechasContratacion = new ArrayList<FechaVO>();
    	Calendar cal = null;
    	FechaVO fechaVOQ= null;
    	DateFormat formatter = new SimpleDateFormat("dd.MM.yyyy");
    	SimpleDateFormat sdf = new SimpleDateFormat(DATE_FORMAT);
    	Locale locale = new Locale("es", "MX");
    	GregorianCalendar gc = new GregorianCalendar(locale);
        cal=Calendar.getInstance();
        gc.setTime(cal.getTime());
		int diaMes = gc.get(Calendar.DATE);
		int totalDiasMes = Fecha.getDiasDelMes(cal.getTime());
		int diasQuincena = 0;
		if(diaMes>=1 && diaMes<=15)
			diasQuincena = 15 - diaMes;
		else if(diaMes>=16 && diaMes<=totalDiasMes)
			diasQuincena = totalDiasMes - diaMes;
		fechaVOQ = new FechaVO();
		cal.add(Calendar.DATE,diasQuincena+1);
		gc.setTime(cal.getTime());
		fechaVOQ.setFecha(formatter.format(cal.getTime()));
		fechaVOQ.setFechaCompleta(getDiaSemena(gc.get(Calendar.DAY_OF_WEEK))+" "+sdf.format(cal.getTime()));
		fechasContratacion.add(fechaVOQ);
		for(int i=1; i<quincenas; i++){
			gc.setTime(cal.getTime());
			fechaVOQ = new FechaVO();
			int diaMes1 = gc.get(Calendar.DATE);
			int totalDiasMes1 = Fecha.getDiasDelMes(cal.getTime());
			if(diaMes1>=1 && diaMes1<=15)
				diasQuincena = 15;
			else if(diaMes1>=16 && diaMes1<=totalDiasMes1){
				if(totalDiasMes1==28) diasQuincena = 13;
				else if(totalDiasMes1==29) diasQuincena = 14;
				else if(totalDiasMes1==31) diasQuincena = 16;
				else diasQuincena = 15;
			}
			cal.add(Calendar.DATE,diasQuincena);
			gc.setTime(cal.getTime());
			fechaVOQ.setFecha(formatter.format(cal.getTime()));
			fechaVOQ.setFechaCompleta(getDiaSemena(gc.get(Calendar.DAY_OF_WEEK))+" "+sdf.format(cal.getTime()));
			fechasContratacion.add(fechaVOQ);
		}
        return  fechasContratacion;
	}
    
    public static String getFechaInicioSemana(Integer semana, String formato){
    	int semanaActual = Integer.parseInt(Fecha.getFechaActual("ww"));
    	SimpleDateFormat sdf = new SimpleDateFormat(formato);
    	Locale locale = new Locale("es", "MX");
    	GregorianCalendar gc = new GregorianCalendar(locale);
    	Calendar c1 = Calendar.getInstance();
    	gc.setTime(c1.getTime());
    	int dia = gc.get(Calendar.DAY_OF_WEEK);
    	//Domingo 1, Lunes 2, Martes 3, Miercoles 4, Jueves 5, Viernes 6, Sabado 7
    	if(semana!=null && semana.intValue()<semanaActual){
    		switch(dia){
	        	case 3: c1.add(Calendar.DATE,-8); break;
	        	case 4: c1.add(Calendar.DATE,-9); break;
	        	case 5: c1.add(Calendar.DATE,-10); break;
	        	case 6: c1.add(Calendar.DATE,-11); break;
	        	case 7: c1.add(Calendar.DATE,-12); break;
	        	case 1: c1.add(Calendar.DATE,-13); break;
    		}
    	}else{
    		switch(dia){
	        	case 3: c1.add(Calendar.DATE,-1); break;
	        	case 4: c1.add(Calendar.DATE,-2); break;
	        	case 5: c1.add(Calendar.DATE,-3); break;
	        	case 6: c1.add(Calendar.DATE,-4); break;
	        	case 7: c1.add(Calendar.DATE,-5); break;
	        	case 1: c1.add(Calendar.DATE,-6); break;
    		}
    	}
    	return sdf.format(c1.getTime());
    }
    
    public static String getFechaFinSemana(Integer semana, String formato){
    	int semanaActual = Integer.parseInt(Fecha.getFechaActual("ww"));
    	SimpleDateFormat sdf = new SimpleDateFormat(formato);
    	Locale locale = new Locale("es", "MX");
    	GregorianCalendar gc = new GregorianCalendar(locale);
    	Calendar c2 = Calendar.getInstance();
    	gc.setTime(c2.getTime());
    	int dia = gc.get(Calendar.DAY_OF_WEEK);
    	//Domingo 1, Lunes 2, Martes 3, Miercoles 4, Jueves 5, Viernes 6, Sabado 7
    	if(semana!=null && semana.intValue()<semanaActual){
    		switch(dia){
	    		case 2: c2.add(Calendar.DATE,-1); break;
	    		case 3: c2.add(Calendar.DATE,-2); break;
	    		case 4: c2.add(Calendar.DATE,-3); break;
	    		case 5: c2.add(Calendar.DATE,-4); break;
	    		case 6: c2.add(Calendar.DATE,-5); break;
	    		case 7: c2.add(Calendar.DATE,-6); break;
    		}
    	}else{
	    	switch(dia){
	    		case 2: c2.add(Calendar.DATE,6); break;
	    		case 3: c2.add(Calendar.DATE,5); break;
	    		case 4: c2.add(Calendar.DATE,4); break;
	    		case 5: c2.add(Calendar.DATE,3); break;
	    		case 6: c2.add(Calendar.DATE,2); break;
	    		case 7: c2.add(Calendar.DATE,1); break;
	    	}
    	}
    	return sdf.format(c2.getTime());
    }
    
    public static String weekSelect(String date) {
		DateFormat df = new SimpleDateFormat("dd.MM.yyyy");
		Date fecha = null;
		try{
        	fecha = df.parse(date);            
        } catch (ParseException e){
            e.printStackTrace();
        }
		Locale locale = new Locale("en", "US");
    	SimpleDateFormat sdf = new SimpleDateFormat("ww", locale);
    	int valor = new Integer(sdf.format(fecha)).intValue()-1;
		return (new Integer(valor)).toString();
	}
    
    
    public static String toWeek(String date) {
    	SimpleDateFormat dateformato = new SimpleDateFormat("dd.MM.yyyy");
        Date fecha = null;
        try
        {
            fecha = dateformato.parse(date);
        }
        catch(ParseException e){
        	e.printStackTrace();
        }
        Calendar calendario = Calendar.getInstance();
        calendario.setTime(fecha);
    	int valor = calendario.get(Calendar.WEEK_OF_YEAR);
		return (new Integer(valor)).toString();
	}    
    
    
	public static String getNumMES(String mes){
		String nunmMes = "";
		
		if(mes.toUpperCase().equals("ENERO"))
			nunmMes = "01";
		if(mes.toUpperCase().equals("FEBRERO"))
			nunmMes = "02";
		if(mes.toUpperCase().equals("MARZO"))
			nunmMes = "03";
		if(mes.toUpperCase().equals("ABRIL"))
			nunmMes = "04";
		if(mes.toUpperCase().equals("MAYO"))
			nunmMes = "05";
		if(mes.toUpperCase().equals("JUNIO"))
			nunmMes = "06";
		if(mes.toUpperCase().equals("JULIO"))
			nunmMes = "07";
		if(mes.toUpperCase().equals("AGOSTO"))
			nunmMes = "08";
		if(mes.toUpperCase().equals("SEPTIEMBRE"))
			nunmMes = "09";
		if(mes.toUpperCase().equals("OCTUBRE"))
			nunmMes = "10";
		if(mes.toUpperCase().equals("NOVIEMBRE"))
			nunmMes = "11";
		if(mes.toUpperCase().equals("DICIEMBRE"))
			nunmMes = "12";
		return nunmMes;
	}    
	public static String getMES(String mes){
		String nunmMes = "";
		
		if(mes.toUpperCase().equals("01"))
			nunmMes = "ENERO";
		if(mes.toUpperCase().equals("02"))
			nunmMes = "FEBRERO";
		if(mes.toUpperCase().equals("03"))
			nunmMes = "MARZO";
		if(mes.toUpperCase().equals("04"))
			nunmMes = "ABRIL";
		if(mes.toUpperCase().equals("05"))
			nunmMes = "MAYO";
		if(mes.toUpperCase().equals("06"))
			nunmMes = "JUNIO";
		if(mes.toUpperCase().equals("07"))
			nunmMes = "JULIO";
		if(mes.toUpperCase().equals("08"))
			nunmMes = "AGOSTO";
		if(mes.toUpperCase().equals("09"))
			nunmMes = "SEPTIEMBRE";
		if(mes.toUpperCase().equals("10"))
			nunmMes = "OCTUBRE";
		if(mes.toUpperCase().equals("11"))
			nunmMes = "NOVIEMBRE";
		if(mes.toUpperCase().equals("12"))
			nunmMes = "DICIEMBRE";
		return nunmMes;
	}    
 
	public static int getMonths(String fecha1, String fecha2) {
		String[] split = fecha1.split("\\.");		
		int D = Integer.parseInt(split[0].trim());
		int M = Integer.parseInt(split[1].trim());
		int Y = Integer.parseInt(split[2].trim());
		java.util.GregorianCalendar g1=new java.util.GregorianCalendar(Y,M-1,D);
		
		split = fecha2.split("\\.");		
		D = Integer.parseInt(split[0].trim());
		M = Integer.parseInt(split[1].trim());
		Y = Integer.parseInt(split[2].trim());
		java.util.GregorianCalendar g2=new java.util.GregorianCalendar(Y,M-1,D);
		
		int elapsed = -1; // Por defecto estaba en 0 y siempre asi no haya pasado un mes contaba 1)
		GregorianCalendar gc1, gc2;

		if (g2.after(g1)) {
		gc2 = (GregorianCalendar) g2.clone();
		gc1 = (GregorianCalendar) g1.clone();
		}
		else {
		gc2 = (GregorianCalendar) g1.clone();
		gc1 = (GregorianCalendar) g2.clone();
		} 

		while ( gc1.before(gc2) ) {
		gc1.add(Calendar.MONTH, 1);
		elapsed++; 
		}

		if (gc1.get(Calendar.DATE)==(gc2.get(Calendar.DATE))) elapsed++; // si es el mismo dia cuenta para la suma de meses 
		return elapsed;
		} 

	public static int obtenerDiferenciaDias(String fecha1, String fecha2) {
		
		String[] split = fecha1.split("\\.");		
		int D = Integer.parseInt(split[0].trim());
		int M = Integer.parseInt(split[1].trim());
		int Y = Integer.parseInt(split[2].trim());
		Calendar date1 = new GregorianCalendar(Y, M-1, D);
		
		split = fecha2.split("\\.");		
		D = Integer.parseInt(split[0].trim());
		M = Integer.parseInt(split[1].trim());
		Y = Integer.parseInt(split[2].trim());
		Calendar date2 = new GregorianCalendar(Y, M-1, D);
		
		GregorianCalendar dateTemp = new GregorianCalendar(date1.get(Calendar.YEAR), date1.get(Calendar.MONTH), date1.get(Calendar.DAY_OF_MONTH)); //Se usa cuando la diferencia de años es mayor a 1
		int diff = 0;
		int dias = 0; 

		diff = date2.get(Calendar.YEAR) - date1.get(Calendar.YEAR);

		if (diff == 0) {
		dias = date2.get(Calendar.DAY_OF_YEAR)- date1.get(Calendar.DAY_OF_YEAR);
		} else if (diff > 0) {
		dias = ((GregorianCalendar) date1).isLeapYear(date1.get(Calendar.YEAR)) ? 366 - date1.get(Calendar.DAY_OF_YEAR) : 365 - date1.get(Calendar.DAY_OF_YEAR);
		for (int i = 1; i < diff; i++) {
		dateTemp.add(Calendar.YEAR, 1);
		dias += dateTemp.isLeapYear(dateTemp.get(Calendar.YEAR)) ? 366: 365;
		}
		dias += date2.get(Calendar.DAY_OF_YEAR);
		}

		return dias;
		}
		
		/**Devuelve la fecha del actual separada por puntos 7.11.2013
		 * @return fecha
		 */
		public String fechaActualString(){
			String fecha="";
			
			try {
				Calendar calendario = Calendar.getInstance();
				int diaActual=calendario.get(Calendar.DAY_OF_MONTH);
				int mesActual=calendario.get(Calendar.MONTH)+1;
				int anioActual=calendario.get(Calendar.YEAR);
				fecha=diaActual+"."+mesActual+"."+anioActual;
			} catch (Exception e) {
				e.printStackTrace();
			}
			return fecha;
		}
		
		/** Devuelve la edad en años 
		 * @param fechaNac
		 * @return anios
		 */
		public static int calcularEdad(Calendar fechaNac) {
			 
			Calendar fechaActual = Calendar.getInstance();
			int anios = fechaActual.get(Calendar.YEAR) - fechaNac.get(Calendar.YEAR);
			int meses = fechaActual.get(Calendar.MONTH) - fechaNac.get(Calendar.MONTH);
			int dias = fechaActual.get(Calendar.DAY_OF_MONTH) - fechaNac.get(Calendar.DAY_OF_MONTH);
			 
			if(meses < 0 || (meses==0 && dias < 0)) { 
			    anios--;
			}
		    return anios;
		}
	

}
