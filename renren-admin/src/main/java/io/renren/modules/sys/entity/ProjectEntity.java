package io.renren.modules.sys.entity;

import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;

/**
 * 
 * 
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2020-07-28 10:08:57
 */
@Data
@TableName("tb_project")
public class ProjectEntity implements Serializable {
	private static final long serialVersionUID = 1L;

	/**
	 * 
	 */
	@TableId
	private Integer id;
	/**
	 * 项目名
	 */
	private String name;
	/**
	 * 0:正常 1:禁用
	 */
	private Integer status;
	/**
	 * 
	 */
	private String key;
	/**
	 * 
	 */
	private Date createTime;

}
