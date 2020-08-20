package io.renren.modules.sys.controller;

import java.util.Arrays;
import java.util.Map;

import io.renren.common.validator.ValidatorUtils;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import io.renren.modules.sys.entity.ProjectEntity;
import io.renren.modules.sys.service.ProjectService;
import io.renren.common.utils.PageUtils;
import io.renren.common.utils.R;



/**
 * 
 *
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2020-07-28 10:08:57
 */
@RestController
@RequestMapping("/sys/project")
public class ProjectController {
    @Autowired
    private ProjectService projectService;

    /**
     * 列表
     */
    @RequestMapping("/list")
    @RequiresPermissions("sys:project:list")
    public R list(@RequestParam Map<String, Object> params){
        PageUtils page = projectService.queryPage(params);

        return R.ok().put("page", page);
    }


    /**
     * 信息
     */
    @RequestMapping("/info/{id}")
    @RequiresPermissions("sys:project:info")
    public R info(@PathVariable("id") Integer id){
        ProjectEntity project = projectService.getById(id);

        return R.ok().put("project", project);
    }

    /**
     * 保存
     */
    @RequestMapping("/save")
    @RequiresPermissions("sys:project:save")
    public R save(@RequestBody ProjectEntity project){
        projectService.save(project);

        return R.ok();
    }

    /**
     * 修改
     */
    @RequestMapping("/update")
    @RequiresPermissions("sys:project:update")
    public R update(@RequestBody ProjectEntity project){
        ValidatorUtils.validateEntity(project);
        projectService.updateById(project);
        
        return R.ok();
    }

    /**
     * 删除
     */
    @RequestMapping("/delete")
    @RequiresPermissions("sys:project:delete")
    public R delete(@RequestBody Integer[] ids){
        projectService.removeByIds(Arrays.asList(ids));

        return R.ok();
    }

}
