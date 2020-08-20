package io.renren.modules.sys.service;

import com.baomidou.mybatisplus.extension.service.IService;
import io.renren.common.utils.PageUtils;
import io.renren.modules.sys.entity.ProjectEntity;

import java.util.Map;

/**
 * 
 *
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2020-07-28 10:08:57
 */
public interface ProjectService extends IService<ProjectEntity> {

    PageUtils queryPage(Map<String, Object> params);
}

