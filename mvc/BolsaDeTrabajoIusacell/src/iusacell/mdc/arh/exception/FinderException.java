package iusacell.mdc.arh.exception;

public class FinderException extends Exception
{
	/**
	 * 
	 */
	private static final long serialVersionUID = 54654561652L;

	public FinderException(String message, Throwable cause)
	{
		super(message, cause);
	}
	
	public FinderException(String message)
	{
		super(message);
	}
	
	public FinderException(Throwable cause)
	{
		super(cause);
	}
	
}